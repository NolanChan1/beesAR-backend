const express = require("express");
const router = express.Router();
const {
  getSimpleProduct,
  getSimpleProductFromName,
  getSimpleProductFromSKU,
} = require("../../controllers/simpleProductController");

// Gets all products in simplifed form
router.get("/", getSimpleProduct);

// Gets simplified product data from the SKU
router.get("/sku/:sku", getSimpleProductFromSKU);

// Gets simplified product data from the name
router.get("/name/:name", getSimpleProductFromName);

module.exports = router;
