const asyncHandler = require("express-async-handler");
const path = require("path");
const dbconn = require("../config/db");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Gets bucket info from env file
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

// Creates an S3 client for retrieving data from bucket
const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// @desc    Gets the product image of a given product
// @route   GET /api/product_images/:file (file is just the sku of the needed product)
// @access  Private
const getProductImage = asyncHandler(async (req, res) => {
  const filename = "product_images/" + req.params.file.toString() + ".jpg"; // Create the filename from the request
  const dbConnect = dbconn.getDb(); // Gets DB connection

  // Create a bucket parameters object and populate with needed info
  const getObjectParams = {
    Bucket: bucketName,
    Key: filename,
  };

  const command = new GetObjectCommand(getObjectParams); // Create command object to send request to S3 bucket
  const url = await getSignedUrl(s3, command, { expiresIn: 300 }); // Get a presigned url for fetching data

  // Create query for ensuring product exists in DB (part of error handling)
  try {
    var query = { Product_SKU: parseInt(req.params.file) };
  } catch (error) {
    query = null;
    console.log(error);
    res.status(500).send(`Error`);
  }

  // Ensure product is in DB then send url to S3 bucket
  dbConnect
    .collection("product_details")
    .find(query)
    .toArray(function (err, result) {
      if (err) {
        res
          .status(500)
          .send(`Error fetching product image with SKU of ${req.params.sku}`);
      } else if (result.length != 1) {
        res
          .status(404)
          .send(`Could not find product image with SKU of ${req.params.sku}`);
      } else if (result[0].Product_SKU == req.params.file) {
        res.status(200).send(url);
      }
    });
});

module.exports = getProductImage;
