const express = require('express');
const router = express.Router();
const { getProducts, getProductFromSKU } = require('../../controllers/productController');

// Gets all products
router.get('/', getProducts);

// Get single product by id
router.get('/:sku', getProductFromSKU);

module.exports = router;