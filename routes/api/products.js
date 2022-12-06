const express = require('express');
const router = express.Router();
const { getProducts, getProductFromID } = require('../../controllers/productController');

// Gets all products
router.get("/", getProducts);

// Get single product by id
router.get('/:id', getProductFromID);

module.exports = router;