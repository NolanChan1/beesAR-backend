const { query } = require("express");
const asyncHandler = require("express-async-handler");
const dbconn = require("../config/db");

// @desc    Gets all products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb();

  dbConnect
    .collection("product_details")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching products.");
      } else {
        res.status(200).json(result);
      }
    });
});

// @desc    Gets a product from a given product ID
// @route   GET /api/pruducts/:id
// @access  Private
const getProductFromSKU = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb();

  try {
    var query = { "Product_SKU" : parseInt(req.params.sku) };
  } catch (error) {
    query = null;
    console.log(error);
    res.status(500).send(`Error`);
  }

  dbConnect
    .collection("product_details")
    .find(query)
    .toArray(function (err, result) {
      if (err) {
        res
          .status(500)
          .send(`Error fetching product with SKU of ${req.params.sku}`);
      } else if (result.length != 1) {
        res
          .status(404)
          .send(`Could not find product with SKU of ${req.params.sku}`);
      } else if (result[0].Product_SKU == req.params.sku) {
        res.status(200).json(result);
      }
    });
});

module.exports = {
  getProducts,
  getProductFromSKU,
};
