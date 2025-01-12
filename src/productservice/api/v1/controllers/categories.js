const errorCodes = require("./../../../config/errors");
const ErrorObj = require("../models/errors");
const Category = require("../models/categories");
const { checkRequiredParameters, strongParameters } = require("../help");
const slugify = require("slugify");
const sequelize = require("sequelize");
const Product = require("../models/products");
const { Op } = require("sequelize");
const ProductMedia = require("../models/media");
const ProductReview = require("../models/product_reviews");

// Get all record in categories table
module.exports.getAll = async (req, res) => {
  try {
    let categories = await Category.findAll({
      include: {
        model: Category,
      },
    });
    res.status(200).json({
      len: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Get detail a category
module.exports.getCategory = async (req, res) => {
  try {
    let categoryId = req.params.id;
    let { view } = req.query;
    let top_products = undefined;
    let option = {};
    if (view === "filter") {
      console.log('hello')
      let { min_price, max_price, rating, stock } = req.query;
      let where = {};
      if (min_price) {
        where.regularPrice = { [Op.gte]: min_price };
      }
      if (max_price) {
        if (!where.regularPrice) {
          where.regularPrice = {};
        }
        where.regularPrice[Op.lte] = max_price;
      }
      if (rating) {
        where.rating = { [Op.gte]: rating };
      }
      if (stock) {
        if (stock === "instock") {
          where.stock = { [Op.gt]: 0 };
        } else {
          if (!where.stock) {
            where.stock = {};
          }
          where.stock[Op.eq] = 0;
        }
      }
      let whereCategory = {};
      if (isNaN(categoryId)) {
        whereCategory.slug = categoryId;
      } else {
        whereCategory.id = categoryId;
      }
      let category = await Category.findOne({
        where: whereCategory,
        include: [
          {
            model: Product,
            where,
            include: [
              {
                model: ProductMedia,
                where: { isMain: true },
              },
              {
                model: ProductReview,
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        type: "category",
        data: category,
      });
    }
    if (view === "top") {
      let category = await Category.findOne({
        where: {
          [Op.or]: [{ id: categoryId }, { slug: categoryId }],
        },
      });
      console.log(category);
      top_products = category.top_products.split(", ");
      option = {
        where: {
          id: category.id,
        },
        include: {
          model: Product,
          where: {
            id: {
              [Op.in]: top_products,
            },
          },
        },
      };
      category = await Category.findOne(option);
      return res.status(200).json({
        type: "category",
        data: category,
      });
    }
    if (view === "products") {
      let where = {};
      if (isNaN(categoryId)) {
        where.slug = categoryId;
      } else {
        where.id = categoryId;
      }
      let category = await Category.findOne({
        where,
        include: [
          {
            model: Product,
            include: [
              {
                model: ProductMedia,
                where: { isMain: true },
              },
              {
                model: ProductReview,
              },
            ],
          },
        ],
      });
      return res.status(200).json({
        type: "category",
        data: category,
      });
    }

    let category = await Category.findOne({
      where: { [Op.or]: [{ id: categoryId }, { slug: categoryId }] },
      include: [
        {
          model: Product,
        },
        {
          model: Category,
        },
      ],
      attributes: [
        "id",
        "name",
        "description",
        "slug",
        "parentId",
        "icon",
        "createdAt",
        "updatedAt",
        // [sequelize.fn("COUNT", sequelize.col("products.id")), "productCount"],
      ],
      // group: ["categories.id", "category.id"],
    });
    res.status(200).json({
      type: "category",
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Delete multiple category with id
module.exports.deleteMultiple = async (req, res) => {
  try {
    const { selected } = req.body;
    if (selected.length <= 0) {
      const err = new ErrorObj(
        errorCodes.invalidData,
        422,
        "Invalid data",
        "category id empty.",
        { pointer: "/selected" }
      );
      res.status(422).json({ errors: [err] });
    }

    try {
      const result = await Category.destroy({
        where: {
          id: {
            [sequelize.Op.in]: selected,
          },
        },
      });
      res.status(200).json({ message: "delete successfully." });
    } catch (err_db) {
      const err = new ErrorObj(
        errorCodes.foreignKeyConstraint,
        422,
        "Violate constraint",
        err_db.message,
        { pointer: "/selected" }
      );
      res.status(422).json({ errors: [err] });
    }
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Search category
module.exports.search = async (req, res) => {
  try {
    const { name } = req.query;
    const categories = await Category.findAll({
      where: {
        name: {
          [sequelize.Op.iLike]: `%${name}%`,
        },
      },
    });
    res.status(200).json({
      len: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Create a category
module.exports.create = async (req, res) => {
  try {
    // Validate request body
    const data = checkRequiredParameters(req.body, ["name"]);
    if (!data[0]) {
      return res.status(422).json({ errors: data[1] });
    }

    let { name, description = "", slug, parentId = null } = req.body;
    if (!slug) {
      slug = slugify(name, {
        lower: true,
        strict: true,
        locale: "en",
      });
    }

    if (parentId != null) {
      if (!Number.isInteger(parentId) || parentId < 0) {
        const err = new ErrorObj(
          errorCodes.invalidData,
          422,
          "Invalid data",
          "parentId must be number and greater 0."
        );
        return res.status(422).json({ errors: [err] });
      }
    }

    let category;
    try {
      // Execute sql
      category = await Category.create(
        {
          name,
          description,
          slug,
          parentId,
        },
        { returning: true }
      );
    } catch (err_db) {
      if (err_db.name === "SequelizeUniqueConstraintError") {
        if (err_db.errors[0].path === "slug") {
          err = new ErrorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate record",
            "duplicate slug category.",
            { pointer: "/slug" }
          );
        } else {
          err = new ErrorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate entry",
            "duplicate name category.",
            { pointer: "/name" }
          );
        }
        return res.status(422).json({ errors: [err] });
      }
      throw err_db;
    }
    res.status(201).json({
      data: category,
    });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Update a category
module.exports.update = async (req, res) => {
  try {
    const categoryId = req.params.id;
    let data = strongParameters(req.body, [
      "name",
      "slug",
      "description",
      "parentId",
    ]);

    if (data.parentId) {
      // Check if parent id is integer
      if (!Number.isInteger(data.parentId) || data.parentId < 0) {
        const err = new ErrorObj(
          errorCodes.invalidData,
          422,
          "Invalid data",
          "parentId must be number and greater 0.",
          { pointer: "/parentId" }
        );
        return res.status(422).json({ errors: [err] });
      }
    }

    let category;
    try {
      category = await Category.update(data, {
        where: { id: categoryId },
        returning: true,
      });
    } catch (err_db) {
      if (err_db.name === "SequelizeUniqueConstraintError") {
        if (err_db.errors[0].path === "slug") {
          err = new ErrorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate record",
            "duplicate slug category.",
            { pointer: "/slug" }
          );
        } else {
          err = new ErrorObj(
            errorCodes.duplicateEntry,
            422,
            "Duplicate entry",
            "duplicate name category.",
            { pointer: "/name" }
          );
        }
        return res.status(422).json({ errors: [err] });
      }
      throw err_db;
    }
    res.status(200).json({ data: category[1] });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Delete a category
module.exports.delete = async (req, res) => {
  try {
    let categoryId = req.params.id;
    try {
      await Category.destroy({ where: { id: categoryId } });
    } catch (err_db) {
      if (err_db.name === "SequelizeForeignKeyConstraintError") {
        const err = new ErrorObj(
          errorCodes.foreignKeyConstraint,
          422,
          "Violate constraint",
          "violate foreign key constraint parentId.",
          { pointer: "/parentId" }
        );
        return res.status(422).json({ errors: [err] });
      }
    }
    res.status(200).json({ message: "category is deleted" });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.getProductListOfCategory = async (req, res) => {
  try {
    const { view } = req.query;
    let categoryId = req.params.id;
    let top_products = undefined;
    let option = {};
    if (view === "top") {
      let category = await Category.findOne({
        where: {
          [Op.or]: [{ id: categoryId }, { slug: categoryId }],
        },
      });
      top_products = category.top_products.split(", ");
      option = {
        where: {
          id: category.Id,
        },
        include: {
          model: Product,
          where: {
            id: {
              [Op.in]: top_products,
            },
          },
        },
      };
    } else {
      option = {
        where: {
          [Op.or]: [{ id: categoryId }, { slug: categoryId }],
        },
        include: {
          model: Product,
        },
      };
    }

    let category = await Category.findOne(option);
    res.status(200).json({
      type: "category",
      data: category,
    });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};
