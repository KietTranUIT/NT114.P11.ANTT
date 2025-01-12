const errorCodes = require("./../../../config/errors");
const ErrorObj = require("../models/errors");
const {
  checkRequiredParameters,
  strongParameters,
  generateSlug,
} = require("../help");
const Product = require("../models/products");
const ProductMedia = require("../models/media");
const { sequelize } = require("../../../config/db");
const {
  checkFileType,
  uploadVideoBuffer,
  uploadFileV101,
  resizeImage,
  isImageFile,
  isVideoFile,
  parseField,
} = require("../help/upload");
const ProductVariant = require("../models/variants");
const VariantAttribute = require("../models/variant_attributes");
const Category = require("../models/categories");
const Brand = require("../models/brands");
const ProductTag = require("../models/product_tags");
const Tag = require("../models/tags");
const { Op } = require("sequelize");
const ProductReview = require("../models/product_reviews");
const ProductAttribute = require("../models/attributes");
const User = require("../models/users");

module.exports.defaultRoute = async (req, res) => {
  res.status(200).json({ message: "Welcome to Product service!" });
};

// Limit size video
const limitVideoSize = 45003139; // 20MB

// List params is allowed when create a product
const whiteListProductCreationParams = [
  "name",
  "slug",
  "description",
  "regularPrice",
  "salePrice",
  "startSale",
  "endSale",
  "stock",
  "status",
  "categoryId",
  "brandId",
  "reviewAllowed",
  "tags",
];

// List params is allowed when create a product variant
const whiteListVariantCreationParams = [
  "regularPrice",
  "salePrice",
  "startSale",
  "endSale",
  "stock",
  "status",
  "attributes",
];

// List params is allowed when create variant attribute
const whiteListAttributeVariantCreationParams = ["attributeId", "value"];

// Create a product
module.exports.create = async (req, res) => {
  try {
    // Get product params in form data
    let productData;
    try {
      productData = JSON.parse(req.body.product);
    } catch (err_json) {
      const errobj = new ErrorObj(
        errorCodes.invalidData,
        400,
        "Invalid data",
        "product form data invalid.",
        { pointer: "/product" }
      );
      return res.status(400).json({ errors: [errobj] });
    }
    // Checking of params is required
    let check = checkRequiredParameters(productData, ["name", "regularPrice"]);
    if (!check[0]) {
      return res.status(422).json({ errors: check[1] });
    }
    // Ignore all params is not in whitelist
    const productParams = strongParameters(
      productData,
      whiteListProductCreationParams
    );
    // Check if don't have slug
    if (!productParams.slug) {
      productParams.slug = generateSlug(productParams.name);
    }

    // Get product variant params
    let variantParams = [];
    let variant_errs = [];
    if (req.body.variant) {
      // Get variant params in form data
      let variantData;
      try {
        variantData = JSON.parse(req.body.variant);
      } catch (err_json) {
        const errobj = new ErrorObj(
          errorCodes.invalidData,
          400,
          "Invalid data",
          "variant form data invalid.",
          { pointer: "/variant" }
        );
        return res.status(400).json({ errors: [errobj] });
      }
      if (!(variantData instanceof Array)) {
        const errobj = new ErrorObj(
          errorCodes.invalidData,
          400,
          "Invalid data",
          "variant form data invalid.",
          { pointer: "/variant" }
        );
        return res.status(400).json({ errors: [errobj] });
      }
      variantData.map((variant) => {
        // Checking of params is required in variant data
        const check = checkRequiredParameters(variant, ["attributes"]);
        if (!check[0]) {
          variant_errs.push(check[1]);
          return;
        }

        // Ignore all params is not in whitelist
        let strongVariantParams = strongParameters(
          variant,
          whiteListVariantCreationParams
        );
        // Set variant regular price is product price if it is not exists
        if (!strongVariantParams.regularPrice) {
          strongVariantParams.regularPrice = productParams.regularPrice;
        }

        // Checking of params is required in attribute variant
        strongVariantParams.attributes.map((attribute) => {
          const check = checkRequiredParameters(attribute, [
            "attributeId",
            "value",
          ]);
          if (!check[0]) {
            variant_errs.push(check[1]);
            return;
          }
        });
        variantParams.push(strongVariantParams);
      });
    }
    if (variant_errs.length > 0) {
      return res.status(422).json({ errors: variant_errs });
    }

    // Check file type of product media
    let flag = true;
    let file_errs = [];
    req.files.map((file) => {
      if (!checkFileType(file, ["image", "video"])) {
        const file_err = new ErrorObj(
          errorCodes.invalidFile,
          422,
          "Invalid file type",
          `file ${file.originalname} is invalid`,
          { pointer: "/file" }
        );
        file_errs.push(file_err);
      }

      // Check limit video file
      if (isVideoFile(file) && file.size > limitVideoSize) {
        const file_err = new ErrorObj(
          errorCodes.invalidFile,
          422,
          "Invalid file type",
          `file ${file.originalname} size over 20MB`,
          { pointer: "/file" }
        );
        file_errs.push(file_err);
      }
      if (isImageFile(file)) {
        flag = false;
      }
    });
    if (flag) {
      const file_err = new ErrorObj(
        errorCodes.missingField,
        422,
        "Missing file",
        "phải có ít nhất một file hình ảnh",
        { pointer: "/file" }
      );
      return res.status(422).json({ errors: [file_err] });
    }

    if (file_errs.length > 0) {
      return res.status(422).json({ errors: file_errs });
    }

    let mediaParams = [];
    for (let i = 0; i < req.files.length; i++) {
      let uploadResult;
      if (isVideoFile(req.files[i])) {
        uploadResult = await uploadVideoBuffer(req.files[i].buffer, "products");
        if (uploadResult instanceof Error) {
          throw new Error(uploadResult.message);
        }
        mediaParams.push({ url: uploadResult.secure_url, mType: "video" });
        return;
      }
      let buffer = await resizeImage(req.files[i].buffer, 1000, 1000);
      uploadResult = await uploadFileV101(buffer, "products");
      if (i == 0) {
        mediaParams.push({
          url: uploadResult.secure_url,
          mType: "image",
          isMain: true,
        });
      } else {
        mediaParams.push({ url: uploadResult.secure_url, mType: "image" });
      }
    }

    let product, medias;
    let variants = [];
    let tags;
    // Create a transaction
    let transaction = await sequelize.transaction();
    try {
      let tagIds = productParams.tags;
      if (tagIds) {
        delete productParams.tags;
      }
      // Create record on products table
      product = await Product.create(productParams, { transaction });

      // Create tags of product
      if (tagIds) {
        let tagParams = [];
        for (let i = 0; i < tagIds.length; i++) {
          tagParams.push({
            tagId: tagIds[i],
            productId: product.id,
          });
        }
        tags = await ProductTag.bulkCreate(tagParams, { transaction });
      }

      // Create record on product_medias table
      for (let i = 0; i < mediaParams.length; i++) {
        mediaParams[i].productId = product.id;
      }
      medias = await ProductMedia.bulkCreate(mediaParams, { transaction });

      // Create record on product_variants table
      if (variantParams.length > 0) {
        for (let i = 0; i < variantParams.length; i++) {
          let attributeParams = variantParams[i].attributes;
          delete variantParams[i].attributes;
          variantParams[i].productId = product.id;
          let variant = await ProductVariant.create(variantParams[i], {
            transaction,
          });

          let attributes = [];
          for (let j = 0; j < attributeParams.length; j++) {
            const variant_attribute = await VariantAttribute.create(
              {
                variantId: variant.id,
                attributeId: attributeParams[i].attributeId,
                value: attributeParams[i].value,
              },
              { transaction }
            );
            attributes.push(variant_attribute);
          }
          variants.push({ variant, attributes });
        }
      }

      // Save all if success
      await transaction.commit();
    } catch (err_db) {
      await transaction.rollback();
      if (err_db.name === "SequelizeUniqueConstraintError") {
        let err;
        if (err_db.errors[0].path === "email") {
          err = new ErrorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate record",
            "duplicate slug product.",
            { pointer: "/product/slug" }
          );
        } else {
          err = new ErrorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate entry",
            "duplicate name product.",
            { pointer: "/product/name" }
          );
        }
        return res.status(422).json({ errors: [err] });
      }
      throw err_db;
    }

    res.status(201).json({
      type: "product",
      data: {
        product,
        variants,
        medias,
        tags,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

const getProductsParamsWhiteList = [
  "page",
  "limit",
  "search",
  "sort",
  "order",
  "field",
  "include",
];
const dictionary = {
  media: ProductMedia,
  variant: ProductVariant,
  category: Category,
  brand: Brand,
  tags: ProductTag,
};

// Get detail products
module.exports.getDetail = async (req, res) => {
  try {
    const slugOrId = req.params.slugorid;
    let where = {};
    if (isNaN(slugOrId)) {
      where.slug = slugOrId;
    } else {
      where.id = slugOrId;
    }

    let product;
    try {
      product = await Product.findOne({
        where,
        include: [
          { model: Brand },
          { model: Category },
          {
            model: Tag,
            as: "tags_detail",
            through: {},
          },
          {
            model: ProductReview,
            include: [
              {
                model: User,
                attributes: ["fullName", "email"],
              },
            ],
          },
          {
            model: ProductMedia,
          },
          {
            model: ProductVariant,
            include: [
              {
                model: VariantAttribute,
                include: [
                  {
                    model: ProductAttribute,
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
        ],
        order: [[{ model: ProductMedia }, "id", "ASC"]],
      });
      return res.status(200).json({
        type: "product",
        data: product,
      });
    } catch (err_db) {
      console.log(err_db);
      throw err_db;
    }
    res.status(200).json({
      type: "product",
      data: product,
    });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Get products
module.exports.get = async (req, res) => {
  try {
    
    //let queries = strongParameters(req.query, getProductsParamsWhiteList)
    let user;
    if (req.headers["x-user"] != undefined) {
      user = JSON.parse(req.headers["x-user"]);
    }
    let queries = req.query;
    if (queries.search) {
      console.log('hello')
      const products = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${queries.search}%`,
          },
        },
        include: [
          {
            model: ProductMedia,
            where: {
              isMain: true,
            },
          },
        ],
      });
      return res.status(200).json({
        type: "products",
        data: products,
      });
    }
    if (queries.list) {
      let pid = queries.list.split(", ");
      const products = await Product.findAll({
        where: {
          id: {
            [Op.in]: pid,
          },
        },
        include: [
          {
            model: ProductMedia,
            where: {
              isMain: true,
            },
          },
          {
            model: ProductReview,
          },
        ],
      });
      return res.status(200).json({
        type: "products",
        data: products,
      });
    }
    if (queries.view === "top") {
      let prod_list = await suggested(user);
      prod_list = prod_list.filter((id) => id != "");
      const products = await Product.findAll({
        where: {
          id: {
            [Op.in]: prod_list,
          },
        },
        include: [
          {
            model: ProductMedia,
            where: {
              isMain: true,
            },
          },
          {
            model: ProductReview,
          },
        ],
      });
      return res.status(200).json({
        type: "products",
        data: products,
      });
    }

    if (queries.view === "sale") {
      const currentTime = new Date();

      let products = await Product.findAll({
        where: {
          startSale: {
            [Op.lte]: currentTime,
          },
          endSale: {
            [Op.gte]: currentTime,
          },
        },
        include: [
          {
            model: ProductMedia,
            where: {
              isMain: true,
            },
          },
          {
            model: ProductReview,
          },
        ],
      });
      return res.status(200).json({
        type: "products",
        data: products,
      });
    }

    // Get total products in database
    if (queries.event === "total") {
      let total = await Product.count();
      return res.status(200).json({ type: "products", total });
    }
    let option = {
      offset:
        queries.page && queries.limit
          ? (queries.page - 1) * queries.limit
          : undefined,
      limit: queries.page && queries.limit ? queries.limit : undefined,
      order: [
        [
          `${queries.sort ? queries.sort : "id"}`,
          `${queries.order ? queries.order : "ASC"}`,
        ],
      ],
      attributes: queries.field
        ? queries.field["product"]
          ? queries.field["product"].split(",")
          : undefined
        : undefined,
      include: queries.include
        ? queries.include.split(",").map((instance) => {
            if (instance === "tags") {
              return {
                model: Tag,
                as: "tags_detail",
              };
            }
            return {
              model: dictionary[instance],
              attributes: queries.field
                ? queries.field[instance]
                  ? queries.field[instance].split(",")
                  : undefined
                : undefined,
            };
          })
        : undefined,
    };
    if (queries.search) {
      option.where = {
        name: {
          [sequelize.Op.iLike]: `%${queries.search}%`,
        },
      };
    }
    // if (queries.field) {
    //     const fields = parseField(queries.field, 'product')
    //     if (fields != null) {
    //         option.attributes = fields
    //     }
    // }

    // Get brands
    const products = await Product.findAll(option);

    res.status(200).json({
      type: "product",
      len: products.length,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Create a review on product
module.exports.review = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = JSON.parse(req.headers["x-user"]).id;
    const check = checkRequiredParameters(req.body, ["rating"]);
    if (!check[0]) {
      const err = new ErrorObj(
        errorCodes.missingField,
        400,
        "Missing field",
        check[1],
        { pointer: "/rating" }
      );
      return res.status(400).json({ errors: [err] });
    }

    const { rating, content } = req.body;

    let review;
    try {
      review = await ProductReview.create({
        productId,
        userId,
        rating,
        content,
      });
    } catch (err_db) {
      console.log(err_db);
    }
    return res.status(201).json({
      type: "product_reviews",
      data: review,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

const maxSuggestions = 30;
// Get suggested products
const suggested = async (user) => {
  let prodIds = [];
  // Get recommended products for a user
  if (user) {
    let usr = await User.findOne({
      where: {
        id: user.id,
      },
      attributes: ["recommended_products"],
    });
    let ids = usr.recommended_products.split(", ");
    ids.forEach((id) => {
      if (!prodIds.includes(id) && prodIds.length < maxSuggestions) {
        prodIds.push(id);
      }
    });
  }

  // user không có sản phaảm đề xuất hoặc user không tồn tại
  if (prodIds.length === 0) {
    // Lấy ngẫu nhiên top những sản phẩm từ các danh mục khác nhau
    let categories = await Category.findAll({
      order: [["top_products", "DESC"]],
      limit: 5,
      attributes: ["top_products"],
    });
    let product_list = [];
    categories.forEach((category) => {
      product_list = product_list.concat(category.top_products.split(", "));
    });
    product_list = product_list.sort(() => Math.random() - 0.5);
    prodIds =
      product_list.length > maxSuggestions
        ? product_list.slice(0, maxSuggestions)
        : product_list;
  } else {
    let categories = await Category.findAll({
      include: [
        {
          model: Product,
          where: {
            id: {
              [Op.in]: prodIds,
            },
          },
          attributes: [],
        },
      ],
      attributes: ["id", "top_products"],
      group: ["categories.id"],
    });
    for (let i = 0; i > categories.length; i++) {
      if (prodIds.length < maxSuggestions) {
        let ids = categories[i].top_products.splitt(", ");
        for (let j = 0; j < ids.length; j++) {
          if (prodIds > maxSuggestions) {
            break;
          }
          if (!prodIds.includes(ids[j])) {
            prodIds.push(ids[j]);
          }
        }
      }
    }
  }
  return prodIds;
};

module.exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.body;
    await ProductMedia.destroy({
      where: { id },
    });
    res.status(201).json({ message: "delete successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.uploadImage = async (req, res) => {
  try {
    const productId = req.body.product;
    console.log("product ", productId);
    console.log("file ", req.body.files);
    let file_errs = [];
    req.files.map((file) => {
      if (!checkFileType(file, ["image", "video"])) {
        const file_err = new ErrorObj(
          errorCodes.invalidFile,
          422,
          "Invalid file type",
          `file ${file.originalname} is invalid`,
          { pointer: "/file" }
        );
        file_errs.push(file_err);
      }

      // Check limit video file
      if (isVideoFile(file) && file.size > limitVideoSize) {
        const file_err = new ErrorObj(
          errorCodes.invalidFile,
          422,
          "Invalid file type",
          `file ${file.originalname} size over 20MB`,
          { pointer: "/file" }
        );
        file_errs.push(file_err);
      }
      if (isImageFile(file)) {
        flag = false;
      }
    });
    if (file_errs.length > 0) {
      return res.status(422).json({ errors: file_errs });
    }

    let mediaParams = [];
    for (let i = 0; i < req.files.length; i++) {
      let uploadResult;
      if (isVideoFile(req.files[i])) {
        uploadResult = await uploadVideoBuffer(req.files[i].buffer, "products");
        if (uploadResult instanceof Error) {
          throw new Error(uploadResult.message);
        }
        mediaParams.push({ url: uploadResult.secure_url, mType: "video" });
        return;
      }
      let buffer = await resizeImage(req.files[i].buffer, 1000, 1000);
      uploadResult = await uploadFileV101(buffer, "products");
      if (i == 0) {
        mediaParams.push({
          productId,
          url: uploadResult.secure_url,
          mType: "image",
          isMain: false,
        });
      } else {
        mediaParams.push({ url: uploadResult.secure_url, mType: "image" });
      }
    }
    const medias = await ProductMedia.bulkCreate(mediaParams);
    res.status(201).json({ type: "media", data: medias });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.update = async (req, res) => {
  try {
    const productId = req.params.id;
    let data = strongParameters(req.body, [
      "name",
      "slug",
      "description",
      "brandId",
      "categoryId",
      "regularPrice",
      "stock",
      "tags",
      "tag_type",
      "type_discount",
      "discount",
      "startSale",
      "endSale",
    ]);
    if (data.type_discount) {
      await Product.update(data, { where: { id: productId } });
      let product = await Product.findOne({
        where: {
          id: productId,
        },
        include: [
          { model: Brand },
          { model: Category },
          {
            model: Tag,
            as: "tags_detail",
            through: {},
          },
          {
            model: ProductReview,
            include: [
              {
                model: User,
                attributes: ["fullName", "email"],
              },
            ],
          },
          {
            model: ProductMedia,
          },
          {
            model: ProductVariant,
            include: [
              {
                model: VariantAttribute,
                include: [
                  {
                    model: ProductAttribute,
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
        ],
        order: [[{ model: ProductMedia }, "id", "ASC"]],
      });
      return res.status(200).json({
        type: "product",
        data: product,
      });
    }
    if (data.tags) {
      if (data.tag_type === "add") {
        await ProductTag.bulkCreate(data.tags);
      } else {
        await ProductTag.destroy({
          where: {
            id: data.tags,
          },
        });
      }
      let product = await Product.findOne({
        where: {
          id: productId,
        },
        include: [
          { model: Brand },
          { model: Category },
          {
            model: Tag,
            as: "tags_detail",
            through: {},
          },
          {
            model: ProductReview,
            include: [
              {
                model: User,
                attributes: ["fullName", "email"],
              },
            ],
          },
          {
            model: ProductMedia,
          },
          {
            model: ProductVariant,
            include: [
              {
                model: VariantAttribute,
                include: [
                  {
                    model: ProductAttribute,
                    attributes: ["name"],
                  },
                ],
              },
            ],
          },
        ],
        order: [[{ model: ProductMedia }, "id", "ASC"]],
      });
      return res.status(200).json({
        type: "product",
        data: product,
      });
    }

    let result;
    try {
      result = await Product.update(data, {
        where: { id: productId },
        returning: true,
      });
    } catch (err_db) {
      if (err_db.name === "SequelizeUniqueConstraintError") {
        if (err_db.errors[0].path === "slug") {
          err = new ErrorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate record",
            "duplicate slug product.",
            { pointer: "/slug" }
          );
        } else {
          err = new ErrorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate entry",
            "duplicate name product.",
            { pointer: "/name" }
          );
        }
        return res.status(422).json({ errors: [err] });
      }
      throw err_db;
    }
    let product = await Product.findOne({
      where: {
        id: result[1][0].id,
      },
      include: [
        { model: Brand },
        { model: Category },
        {
          model: Tag,
          as: "tags_detail",
          through: {},
        },
        {
          model: ProductReview,
          include: [
            {
              model: User,
              attributes: ["fullName", "email"],
            },
          ],
        },
        {
          model: ProductMedia,
        },
        {
          model: ProductVariant,
          include: [
            {
              model: VariantAttribute,
              include: [
                {
                  model: ProductAttribute,
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
      ],
      order: [[{ model: ProductMedia }, "id", "ASC"]],
    });
    return res.status(200).json({
      type: "product",
      data: product,
    });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.getReviews = async (req, res) => {
  try {
    const now = new Date();
    const time_condition = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const reviews = await ProductReview.findAll({
      where: {
        createdAt: {
          [Op.gte]: time_condition
        }
      },
      include: [{ model: Product, attributes: ['name']}, { model: User, attributes: ['email']}]
    });
    res.status(200).json({ type: 'reviews', data: reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};
