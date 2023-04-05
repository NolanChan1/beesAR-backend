const { query } = require("express");
const asyncHandler = require("express-async-handler");
const dbconn = require("../config/db");
const { toTitleCase } = require("../middleware/stringFormatters.js");

// @desc    Gets all products
// @route   GET /api/products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb(); // Gets DB connection

  // Queries for all products and sends them as an array of JSONs
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

// @desc    Gets a product from a given product SKU
// @route   GET /api/products/sku/:sku
// @access  Private
const getProductFromSKU = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb(); // Gets DB connection

  // Forms query for product with given SKU
  try {
    var query = { Product_SKU: parseInt(req.params.sku) };
  } catch (error) {
    query = null;
    console.log(error);
    res.status(500).send(`Error`);
  }

  // Fetchs and returns product data
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

// @desc    Gets a product from a given product name
// @route   GET /api/products/name/:name
// @access  Private
const getProductFromName = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb(); // Gets DB connection

  let formatted_name = toTitleCase(req.params.name); // Ensure name is formatted same as in DB

  // Create query for seaching the name
  try {
    var query = { Name: { $regex: formatted_name } };
  } catch (error) {
    query = null;
    console.log(error);
    res.status(500).send(`Error`);
  }

  // Fetch data and send response
  dbConnect
    .collection("product_details")
    .find(query)
    .toArray(function (err, result) {
      if (err) {
        res
          .status(500)
          .send(`Error fetching product with the name ${formatted_name}`);
      } else if (result.length === 0) {
        res
          .status(404)
          .send(
            `Could not find product containing \"${formatted_name}\" in the name`
          );
      } else {
        res.status(200).json(result);
      }
    });
});

module.exports = {
  getProducts,
  getProductFromSKU,
  getProductFromName,
};
