const express = require("express");
const router = express.Router();

const products = require("./../controllers/products");
const attributeRoutes = require("./attributes");
const tagRoutes = require("./tags");
const fileMiddleware = require("../middleware/fileUploads");

router.post(
  "/uploadimage",
  fileMiddleware.uploadMultipleFile("file", 8),
  products.uploadImage
);
router.post("/deleteimage", products.deleteImage)
router.get("/reviews", products.getReviews);
router.use("/attributes", attributeRoutes);
router.use("/tags", tagRoutes);
router.get("/", products.get);
router.put("/:id", products.update);
router.get("/:slugorid", products.getDetail);
router.post("/", fileMiddleware.uploadMultipleFile("file", 8), products.create);
router.post("/:id/reviews", products.review);

module.exports = router;
