const paypal = require("../../../services/paypal");
const ErrorObj = require("../models/errors");
const errorCodes = require("./../../../config/errors");
const help = require("./../help");
const Cart = require("./../models/carts");
const CartItem = require("./../models/cart_items");
const Product = require("./../models/products");
const ProductVariant = require("./../models/variants");
const VariantAttribute = require("./../models/variant_attributes");
const ShippingMethod = require("./../models/shipping");
const Coupon = require("./../models/coupons");
const ApplyCoupon = require("./../models/apply_coupon");
const Order = require("./../models/orders");
const TrackOrder = require("./../models/track_orders");
const { Op } = require("sequelize");
const OrderItem = require("../models/order_items");
const ProductMedia = require("../models/media");

const tax = 5; // 5% VAT

// Test order
module.exports.default = async (req, res) => {
  try {
    const response = await paypal.createOrder();
    res.status(200).json({ response });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports.getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              include: [{ model: ProductMedia, where: { isMain: true } }],
            },
            {
              model: ProductVariant,
              include: [{ model: VariantAttribute }],
            },
          ],
        },
      ],
    });
    return res.status(200).json({ type: "order", data: order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

// Calculate total price for order
const calculate = async (now, cart, shippingCost) => {
  let subTotal = 0;
  let discount = 0;
  // Chi phí vận chuyển
  let cost = shippingCost;

  cart.cart_items.forEach((item) => {
    subTotal +=
      // Tính dựa trên giá của variant hoặc giá gốc của sản phẩm
      (item.product_varaint != null
        ? item.product_varaint.regularPrice
        : item.product.regularPrice) * item.quantity;
    if (now > item.product.startSale && now < item.product.endSale) {
      discount +=
        item.product.type_discount === "percent"
          ? (item.product.regularPrice * item.product.discount) / 100
          : item.product.regularPrice - item.product.discount;
    }
  });

  // Only apply voucher when discount = 0
  // if (discount != 0 || !coupon) {
  //   return subTotal - discount + cost + (subTotal * tax) / 100;
  // }

  // // Check usage limit
  // if (
  //   coupon.usageLimit <= coupon.usageCount ||
  //   coupon.startDate <= now ||
  //   coupon.endDate >= now
  // ) {
  //   return subTotal - discount + cost + (subTotal * tax) / 100;
  // }

  // // Check if coupon is applied on category
  // if (coupon.apply === "category") {
  //   cart.cart_items.forEach((item) => {
  //     for (let i = 0; i < coupon.apply_coupons.length; i++) {
  //       if (item.product.categoryId === coupon.apply_coupons[i].categoryId) {
  //         discount +=
  //           coupon.value_type === "percent"
  //             ? (item.regularPrice * coupon.value) / 100
  //             : item.regularPrice - coupon.value;
  //         break;
  //       }
  //     }
  //   });
  // } else if (coupon.apply === "ship") {
  //   cost =
  //     coupon.value_type === "percent"
  //       ? (cost * coupon.value) / 100
  //       : cost - coupon.value;
  // } else {
  //   let total = subTotal + cost + (subTotal * tax) / 100;
  //   if (total >= coupon.minOrder) {
  //     discount =
  //       coupon.value_type === "percent"
  //         ? (total * coupon.value) / 100
  //         : total - coupon.value;
  //   }
  // }

  // if (discount != 0) {
  //   coupon.usageCount += 1
  //   await coupon.save()
  // }

  // if (discount > coupon.maxDiscount) {
  //   discount = coupon.maxDiscount;
  // }

  return subTotal - discount + cost;
};

// Payment
module.exports.payment = async (req, res) => {
  try {
    const user = JSON.parse(req.headers["x-user"]);
    // Validate data
    let check = help.checkRequiredParameters(req.body, [
      "paymentMethod",
      "shippingMethod",
      "shippingAddress",
    ]);
    if (!check[0]) {
      return res.status(422).json({ errors: check[1] });
    }

    let { paymentMethod, shippingMethod, shippingAddress } = req.body;

    // Validate shipping address
    check = help.checkRequiredParameters(shippingAddress, [
      "fullName",
      "phoneNumber",
      "address",
      "province",
    ]);
    if (!check[0]) {
      return res.status(422).json({ errors: check[1] });
    }

    // Get current cart of user
    let cart = await Cart.findOne({
      where: { userId: user.id, status: "active" },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Product,
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
    if (cart.cart_items.length === 0) {
      let err = new ErrorObj(
        errorCodes.invalidData,
        422,
        "Not found item",
        "Không có sản phẩm để thanh toán",
        {}
      );
      return res.status(422).json({ errors: [err] });
    }

    // Get shipping cost
    const ship = await ShippingMethod.findOne({
      where: { id: shippingMethod, active: true },
    });

    // Get coupon
    // let coupon = undefined;
    // if (couponId) {
    //   coupon = await Coupon.findOne({
    //     where: {
    //       id: couponId,
    //       active: true,
    //     },
    //     include: [{ model: ApplyCoupon }],
    //   });
    // }

    const now = new Date();
    // Calculate payment
    const total = await calculate(now, cart, ship.cost);

    const order = await Order.create({
      fullName: shippingAddress.fullName,
      phoneNumber: shippingAddress.phoneNumber,
      address: shippingAddress.address,
      province: shippingAddress.province,
      userId: user.id,
      total: total,
      cartId: cart.id,
      paymentMethod,
      shippingMethod: ship.id,
      paid: false,
    });

    // Create order item
    let order_items = cart.cart_items.map((item) => {
      if (now > item.product.startSale && now < item.product.endSale) {
        return {
          orderId: order.id,
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          discount: item.product.discount,
          typeDiscount: item.product.type_discount,
        };
      }
      return {
        orderId: order.id,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      };
    });

    await OrderItem.bulkCreate(order_items);

    // const trackOrder = await TrackOrder.create({
    //   orderId: order.id,
    //   remarks: "Đơn hàng chờ xác nhận",
    // });

    let response;
    if (paymentMethod === "paypal") {
      response = await paypal.createOrder(cart, total, order);
    }

    cart.status = "completed";
    await cart.save();

    // Create a new cart
    await Cart.create({ userId: user.id, status: "active" });

    res.status(200).json({
      url: response,
      data: {
        order,
      },
    });
  } catch (error) {
    console.log("here");
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.success = async (req, res) => {
  try {
    console.log("ditconmenhamaynhe");
    // console.log(req.body);
    // console.log(req.resource)
    // const orderId = req.body.resource.custom_id
    // console.log("order id: ", orderId)
    const httpRes = await paypal.capturePayment(req.query.token);
    console.log(httpRes);
    if (httpRes.status === "COMPLETED") {
      const orderId = httpRes.purchase_units[0].payments.captures[0].custom_id;
      const currentNow = new Date();
      // update order
      await Order.update(
        {
          paid: true,
          status: "confirmed",
          confirmedAt: currentNow,
        },
        {
          where: {
            id: orderId,
          },
        }
      );
    }
    res.redirect("http://localhost:9008/");
  } catch (error) {
    console.log("error");
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.cancel = async (req, res) => {
  try {
    res.status(422).json({ message: "canceled" });
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.get = async (req, res) => {
  try {
    const user = JSON.parse(req.headers["x-user"]);
    let where = {};
    let { status, manage } = req.query;
    if (status) {
      if (status === "checkout") {
        (where.paymentMethod = "paypal"), (where.status = "pending");
      } else if (status === "shipping") {
        where.status = "shipping";
      } else {
        where.status = "completed";
      }
    }
    if (manage) {
      if (user.roleId != 1) {
        return res.status(402).json({ message: "permission denied." });
      }
      if (req.query.total) {
        const total = await Order.count();
        return res.status(200).json({ total });
      }

      if (req.query.analysis) {
        const orders = await Order.findAll({
          where: {
            createdAt: {
              [Op.gte]: req.query.start_time,
              [Op.lte]: req.query.end_time,
            },
            status: {
              [Op.notIn]: ["cancelled", "returned"],
            },
          },
          order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({ type: "order", data: orders });
      }

      if (req.query.time_after) {
        const orders = await Order.findAll({
          where: {
            createdAt: {
              [Op.gte]: req.query.time_after,
            },
          },
          include: [
            {
              model: OrderItem,
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
            },
          ],
          order: [["createdAt", "DESC"]],
        });
        return res.status(200).json({ type: "order", data: orders });
      }

      const { page = 1, pageSize = 10 } = req.query;
      const orders = await Order.findAll({
        offset: (page - 1) * pageSize,
        where,
        // include: [
        //   {
        //     model: OrderItem,
        //     include: [
        //       {
        //         model: Product,
        //         include: [
        //           {
        //             model: ProductMedia,
        //             where: {
        //               isMain: true,
        //             },
        //           },
        //           {
        //             model: ProductVariant,
        //             include: [
        //               {
        //                 model: VariantAttribute,
        //               },
        //             ],
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // ],
        limit: pageSize,
        order: [["createdAt", "DESC"]],
      });
      return res.status(200).json({ type: "order", data: orders });
    }
    where.userId = user.id;

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: OrderItem,
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
        },
      ],
    });
    res.status(200).json({ type: "orders", data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};
