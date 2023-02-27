const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductFromSKU,
  getProductFromName,
} = require("../../controllers/productController");

// Gets all products
router.get("/", getProducts);

// Get single product by id
router.get("/sku/:sku", getProductFromSKU);

// Get single product by name
router.get("/name/:name", getProductFromName);

module.exports = router;
