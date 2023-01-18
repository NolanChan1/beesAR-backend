const express = require('express');
const router = express.Router();
const getCatagoryByName = require('../../controllers/catagoriesController');

// Gets all products of a given catagory
router.get('/:catagory', getCatagoryByName);

module.exports = router;