const { query } = require("express");
const asyncHandler = require("express-async-handler");
const dbconn = require("../config/db");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { toTitleCase } = require("../middleware/stringFormatters");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

// @desc    Gets all products and sends it as a simplified JSON
// @route   GET /api/simple_product
// @access  Private
const getSimpleProduct = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb();
  let toSend = [];

  try {
    var query = {};
  } catch (error) {
    query = null;
    console.log(error);
    res.status(500).send(`Error`);
  }

  dbConnect
    .collection("product_details")
    .find(query)
    .toArray(async function (err, result) {
      if (err) {
        res.status(500).send(`Error fetching products`);
      } else if (result.length === 0) {
        res.status(404).send(`Could not find products`);
      } else {
        for (let product of result) {
          let filename =
            "product_images/" + product.Product_SKU.toString() + ".jpg";

          let getObjectParams = {
            Bucket: bucketName,
            Key: filename,
          };

          let command = new GetObjectCommand(getObjectParams);
          let url = await getSignedUrl(s3, command, { expiresIn: 300 });

          toSend.push({
            Name: product.Name,
            Product_SKU: product.Product_SKU,
            Image_URL: url,
          });
        }

        res.status(200).json(toSend);
      }
    });
});

// @desc    Gets a product from a given product sku and sends it as a simplified JSON
// @route   GET /api/simple_product/:sku
// @access  Private
const getSimpleProductFromSKU = asyncHandler(async (req, res) => {
  const filename = "product_images/" + req.params.sku.toString() + ".jpg";
  const dbConnect = dbconn.getDb();

  const getObjectParams = {
    Bucket: bucketName,
    Key: filename,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 300 });

  try {
    var query = { Product_SKU: parseInt(req.params.sku) };
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
        let toSend = {
          Name: result[0].Name,
          Product_SKU: result[0].Product_SKU,
          Image_URL: url,
        };

        res.status(200).json(toSend);
      }
    });
});

// @desc    Gets a product from a given product name and sends it as a simplified JSON
// @route   GET /api/simple_product/:name
// @access  Private
const getSimpleProductFromName = asyncHandler(async (req, res) => {
  const dbConnect = dbconn.getDb();
  let toSend = [];

  let formatted_name = toTitleCase(req.params.name);

  try {
    var query = { Name: { $regex: formatted_name } };
  } catch (error) {
    query = null;
    console.log(error);
    res.status(500).send(`Error`);
  }

  dbConnect
    .collection("product_details")
    .find(query)
    .toArray(async function (err, result) {
      if (err) {
        res
          .status(500)
          .send(`Error fetching product with name of ${req.params.name}`);
      } else if (result.length === 0) {
        res
          .status(404)
          .send(`Could not find product with name of ${req.params.name}`);
      } else {
        for (let product of result) {
          let filename =
            "product_images/" + product.Product_SKU.toString() + ".jpg";

          let getObjectParams = {
            Bucket: bucketName,
            Key: filename,
          };

          let command = new GetObjectCommand(getObjectParams);
          let url = await getSignedUrl(s3, command, { expiresIn: 300 });

          toSend.push({
            Name: product.Name,
            Product_SKU: product.Product_SKU,
            Image_URL: url,
          });
        }

        res.status(200).json(toSend);
      }
    });
});

module.exports = {
  getSimpleProduct,
  getSimpleProductFromSKU,
  getSimpleProductFromName,
};
