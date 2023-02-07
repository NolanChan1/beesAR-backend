const express = require('express');
const router = express.Router();
const getCategoryByName = require('../../controllers/categoriesController');

// Gets all products of a given category
router.get('/:category', getCategoryByName);

module.exports = router;