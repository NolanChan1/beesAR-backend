const { query } = require("express");
const asyncHandler = require("express-async-handler");
const dbconn = require("../config/db");

// @desc    Gets all products in the given catagory name
// @route   GET /api/catagories/:name
// @access  Private
const getCatagoryByName = asyncHandler(async (req, res) => {
    const dbConnect = dbconn.getDb();

    try {
        var query = { "catagories" : req.params.catagory };
      } catch (error) {
        query = null;
        console.log(error);
      }

    console.log(req.params.catagory);
    dbConnect.collection("products").find(query).toArray(function (err, result) {
        if(err) {
            res.status(500).send(`Error fetching products from the catagory ${req.params.catagory}`);
        } else if(result.length == 0) {
            res.status(404).send(`Could not find any products in the catagory ${req.params.catagory}`);
        } else {
            res.status(200).json(result);
        }
    })
})

module.exports = getCatagoryByName;