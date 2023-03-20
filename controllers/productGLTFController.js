const asyncHandler = require("express-async-handler");
const path = require("path");
const dbconn = require("../config/db");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { createWriteStream } = require("fs");

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

// @desc    Gets the glTF file of a given product
// @route   GET /api/gltf/:file
// @access  Private
const getGLTF = asyncHandler(async (req, res) => {
  const filename = "gltf_files/" + req.params.file.toString() + ".gltf";
  const dbConnect = dbconn.getDb();

  const getObjectParams = {
    Bucket: bucketName,
    Key: filename,
  };

  const command = new GetObjectCommand(getObjectParams);
  const response = await s3.send(command);

  response.Body.pipe(createWriteStream("public/temp.gltf"));

  try {
    var query = { Product_SKU: parseInt(req.params.file) };
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
          .send(`Error fetching product image with SKU of ${req.params.sku}`);
      } else if (result.length != 1 || !response.Body) {
        res
          .status(404)
          .send(`Could not find product image with SKU of ${req.params.sku}`);
      } else if (result[0].Product_SKU == req.params.file) {
        res.status(200).sendFile("temp.gltf", { root: "public" });
      }
    });
});

// const filename = "gltf_files/" + req.params.file.toString() + ".gltf";
// const dbConnect = dbconn.getDb();

// const getObjectParams = {
//     Bucket: bucketName,
//     Key: filename
// };

// const command = new GetObjectCommand(getObjectParams);
// const url = await getSignedUrl(s3, command, {expiresIn: 60 });

// try {
//     var query = { "Product_SKU" : parseInt(req.params.file) };
//   } catch (error) {
//     query = null;
//     console.log(error);
//     res.status(500).send(`Error`);
//   }

//   dbConnect
//     .collection("product_details")
//     .find(query)
//     .toArray(function (err, result) {
//       if (err) {
//         res
//           .status(500)
//           .send(`Error fetching product image with SKU of ${req.params.sku}`);
//       } else if (result.length != 1) {
//         res
//           .status(404)
//           .send(`Could not find product image with SKU of ${req.params.sku}`);
//       } else if (result[0].Product_SKU == req.params.file) {
//          res.status(200).send(url);
//       }
//     });

module.exports = getGLTF;
