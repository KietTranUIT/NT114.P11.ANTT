const ErrorObj = require("../models/errors");
const errorCodes = require("./../../../config/errors");
const { sequelize } = require("../../../config/db");
const { QueryTypes } = require('sequelize');
const Coupon = require('../models/coupons');

// Get coupons
module.exports.get = async (req, res) => {
  try {
    const userId = JSON.parse(req.headers["x-user"]).id;
    const query = `SELECT * FROM coupons WHERE active=true AND apply!='category' AND start_date<now() AND end_date>now() AND usage_limit>usage_count UNION SELECT coupons.id, coupons.name, coupons.description, coupons.code, coupons.value, coupons.value_type, coupons.min_order, coupons.max_discount, coupons.start_date, coupons.end_date, coupons.apply, coupons.usage_limit, coupons.usage_count, coupons.created_at, coupons.updated_at, coupons.active FROM coupons INNER JOIN apply_coupons ON coupons.id = apply_coupons.coupon_id WHERE coupons.apply='category' AND coupons.active=true AND coupons.start_date<now() AND coupons.end_date>now() AND coupons.usage_limit>coupons.usage_count AND apply_coupons.category_id in (SELECT DISTINCT products.category_id FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON cart_items.product_id = products.id WHERE carts.user_id=${userId} AND carts.status='active');`;
    const result = await sequelize.query(query, { model:  Coupon, mapToModel: true });
    res.status(200).json({ data: result})
  } catch (error) {
    console.log(error);
    res.status(500).json(ErrorObj.createInternalError(error.message));
  }
};
