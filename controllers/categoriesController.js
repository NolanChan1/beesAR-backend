const { query } = require("express");
const asyncHandler = require("express-async-handler");
const dbconn = require("../config/db");
const { toTitleCase } = require("../middleware/stringFormatters");

// @desc    Gets all products in the given category name
// @route   GET /api/categories/:category
// @access  Private
const getCategoryByName = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb(); //Get DB connection

  let formatted_category = toTitleCase(req.params.category);

  // Form query
  try {
    var query = { Category: { $regex: formatted_category } };
  } catch (error) {
    query = null;
    console.log(error);
  }

  // Fetch query from DB
  dbConnect
    .collection("product_details")
    .find(query)
    .toArray(function (err, result) {
      if (err) {
        // Sends server error response
        res
          .status(500)
          .send(
            `Error fetching products from the category ${req.params.category}`
          );
      } else if (result.length == 0) {
        // Sends fetching error response
        res
          .status(404)
          .send(
            `Could not find any products in the category ${req.params.category}`
          );
      } else {
        // Sends 200 response with the result
        res.status(200).json(result);
      }
    });
});

module.exports = getCategoryByName;
