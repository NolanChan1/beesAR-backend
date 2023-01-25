const express = require('express');
const router = express.Router();
const getProductImage = require('../../controllers/productImageController');

// Gets image of a product
router.get('/:file', getProductImage);

module.exports = router;