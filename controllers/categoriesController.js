const { query } = require("express");
const asyncHandler = require("express-async-handler");
const dbconn = require("../config/db");

// @desc    Gets all products in the given category name
// @route   GET /api/categories/:name
// @access  Private
const getCategoryByName = asyncHandler(async (req, res) => {
    const dbConnect = dbconn.getDb();

    try {
        var query = { "Category" : req.params.category };
      } catch (error) {
        query = null;
        console.log(error);
      }

    dbConnect.collection("product_details").find(query).toArray(function (err, result) {
        if(err) {
            res.status(500).send(`Error fetching products from the category ${req.params.category}`);
        } else if(result.length == 0) {
            res.status(404).send(`Could not find any products in the category ${req.params.category}`);
        } else {
            res.status(200).json(result);
        }
    })
})

module.exports = getCategoryByName;