const express = require('express');
const router = express.Router();
const getGLTF = require('../../controllers/productGLTFController');

// Gets glTF file of a given product
router.get('/:file', getGLTF);

module.exports = router;