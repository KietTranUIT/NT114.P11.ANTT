const Brand = require("../models/brands");
const ErrorObj = require("../models/errors");
const errorCodes = require("./../../../config/errors");
const help = require("./../help");
const sequelize = require("sequelize");
const Product = require("./../models/products");
const Cart = require("./../models/carts");
const CartItem = require("../models/cart_items");
const ProductVariant = require("../models/variants");
const VariantAttribute = require("../models/variant_attributes");
const ProductMedia = require("../models/media");

// Init a cart for user
module.exports.create = async (req, res) => {
  try {
    const userId = JSON.parse(req.headers["x-user"]).id;

    let cart = undefined;
    // Find available cart in database
    cart = await Cart.findOne({
      where: {
        userId,
        status: "active",
      },
    });
    if (cart) {
      const err = new ErrorObj(
        errorCodes.duplicateEntry,
        422,
        "Duplicate",
        "hiện tại đã có cart đang hoạt đông",
        {}
      );
      return res.status(422).json({ errors: [err] });
    }

    // Init cart
    cart = await Cart.create({
      userId,
    });
    res.status(200).json({
      type: "cart",
      data: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Get cart of a user
module.exports.get = async (req, res) => {
  try {
    const userId = JSON.parse(req.headers["x-user"]).id;
    const cart = await Cart.findOne({
      where: { userId, status: "active" },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
              include: [
                {
                  model: ProductMedia,
                  where: {
                    isMain: true,
                  },
                },
              ],
            },
            {
              model: ProductVariant,
              include: [
                {
                  model: VariantAttribute,
                },
              ],
            },
          ],
        },
      ],
    });
    return res.status(200).json({ type: "cart", data: cart });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Add a item to cart
module.exports.addItem = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const check = help.checkRequiredParameters(req.body, ["productId"]);
    if (!check[0]) {
      return res.status(400).json({ errors: check[1] });
    }

    const { productId, variantId = null, quantity = 1 } = req.body;

    let item;
    try {
      // Select item if it exists
      item = await CartItem.findOne({
        where: {
          productId,
          variantId,
          cartId,
        },
      });

      if (!item) {
        item = await CartItem.create({
          productId,
          variantId,
          quantity,
          cartId,
        });
      } else {
        item = await CartItem.update(
          { quantity: item.quantity + quantity },
          {
            where: {
              cartId,
              productId,
              variantId,
            },
            returning: true,
          }
        );
        item = item[1];
      }
    } catch (err_db) {
      throw err_db;
    }
    return res.status(201).json({
      type: "cart_items",
      data: item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Update cart
module.exports.removeItem = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const { itemId } = req.body;
    const item = await CartItem.destroy({
      where: {
        cartId,
        id: itemId,
      },
      returning: true,
    });
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Update cart
module.exports.updateItem = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    // Select item
    let item = await CartItem.findOne({ where: { id: itemId } });
    if (item.quantity + quantity <= 0) {
      // delete item
      await CartItem.destroy({
        where: {
          id: itemId,
        },
      });
      return res.status(200).json({ message: "ok" });
    }
    item = await CartItem.update(
      { quantity: item.quantity + quantity },
      {
        where: {
          id: itemId,
        },
      }
    );
    res.status(200).json({
      type: "cart_items",
      data: {
        item,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

// Delete a item in cart
module.exports.deleteItem = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const check = help.checkRequiredParameters(req.query, ["itemId"]);
    if (!check[0]) {
      return res.status(400).json({ errors: check[1] });
    }
    const { itemId }   = req.query
    const item = CartItem.destroy({
        where: {
            cartId, id: itemId,
        }
    })
    res.status(200).json({ message: 'delete successfully.', data: item})
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message))
  }
};
