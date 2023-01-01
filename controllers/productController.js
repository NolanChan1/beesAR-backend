const { query } = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../config/db");
const dbconn = require("../config/db");
var ObjectId = require("mongodb").ObjectId;

// @desc    Gets all products
// @route   GET /api/goals
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb();

  dbConnect
    .collection("products")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching products.");
      } else {
        res.status(200).json(result);
      }
    });
});

const getProductFromID = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb();
  try {
    var query = { _id: new ObjectId(req.params.id) };
  } catch (error) {
    query = null;
    console.log(error);
  }

  dbConnect
    .collection("products")
    .find(query)
    .toArray(function (err, result) {
      if (err) {
        res
          .status(500)
          .send(`Error fetching product with id of ${req.params.id}`);
      } else if (result.length != 1) {
        res
          .status(404)
          .send(`Could not find product with id of ${req.params.id}`);
      } else if (result[0]._id.toString() === req.params.id) {
        res.status(200).json(result);
      }
    });
});

module.exports = {
  getProducts,
  getProductFromID,
};
