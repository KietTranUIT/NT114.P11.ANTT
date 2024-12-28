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

// Calculate total price for order
const calculate = async (cart, shippingCost, coupon) => {
  let subTotal = 0;
  let discount = 0;
  let cost = shippingCost;

  const now = new Date();

  cart.cart_items.forEach((item) => {
    subTotal +=
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
  if (discount != 0 || !coupon) {
    return subTotal - discount + cost + (subTotal * tax) / 100;
  }

  // Check usage limit
  if (
    coupon.usageLimit <= coupon.usageCount ||
    coupon.startDate <= now ||
    coupon.endDate >= now
  ) {
    return subTotal - discount + cost + (subTotal * tax) / 100;
  }

  // Check if coupon is applied on category
  if (coupon.apply === "category") {
    cart.cart_items.forEach((item) => {
      for (let i = 0; i < coupon.apply_coupons.length; i++) {
        if (item.product.categoryId === coupon.apply_coupons[i].categoryId) {
          discount +=
            coupon.value_type === "percent"
              ? (item.regularPrice * coupon.value) / 100
              : item.regularPrice - coupon.value;
          break;
        }
      }
    });
  } else if (coupon.apply === "ship") {
    cost =
      coupon.value_type === "percent"
        ? (cost * coupon.value) / 100
        : cost - coupon.value;
  } else {
    let total = subTotal + cost + (subTotal * tax) / 100;
    if (total >= coupon.minOrder) {
      discount =
        coupon.value_type === "percent"
          ? (total * coupon.value) / 100
          : total - coupon.value;
    }
  }

  if (discount != 0) {
    coupon.usageCount += 1
    await coupon.save()
  }

  if (discount > coupon.maxDiscount) {
    discount = coupon.maxDiscount;
  }

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

    let { paymentMethod, shippingMethod, shippingAddress, couponId } = req.body;

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

    // Get shipping cost
    const ship = await ShippingMethod.findOne({
      where: { id: shippingMethod, active: true },
    });

    // Get coupon
    let coupon = undefined;
    if (couponId) {
      coupon = await Coupon.findOne({
        where: {
          id: couponId,
          active: true,
        },
        include: [{ model: ApplyCoupon }],
      });
    }

    // Calculate payment
    const total = await calculate(cart, ship.cost, coupon);

    const order = await Order.create({
      fullName: shippingAddress.fullName,
      phoneNumber: shippingAddress.phoneNumber,
      address: shippingAddress.address,
      province: shippingAddress.province,
      userId: user.id,
      total: total,
      cartId: cart.id,
      paymentMethod,
      paid: false
    })

    const trackOrder = await TrackOrder.create({
      orderId: order.id,
      remarks: 'Đơn hàng chờ xác nhận'
    })

    let response
    if (paymentMethod === 'paypal') {
      response = await paypal.createOrder(cart, total, order);
    }

    cart.status = 'completed'
    await cart.save()

    // Create a new cart
    await Cart.create({ userId: user.id, status: 'active'})

    res.status(200).json({ url: response, data: {
      order, trackOrder
    } });
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.success = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.resource)
    // const orderId = req.body.resource.custom_id
    // console.log("order id: ", orderId)
    const httpRes = await paypal.capturePayment(req.query.token)
    if (httpRes.status === 'COMPLETED') {
      const orderId = httpRes.purchase_units[0].payments.captures[0].custom_id
      // update order
      await Order.update({ paid: true }, {
        where: {
          id: orderId
        }
      })
    }
    res.redirect('http://localhost:9008/')
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};

module.exports.cancel = async (req, res) => {
  try {
    res.status(422).json({ message: 'canceled'})
  } catch (error) {
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
}
