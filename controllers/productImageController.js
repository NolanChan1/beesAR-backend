const asyncHandler = require("express-async-handler");
const path = require("path");


// @desc    Gets the product image of a given product
// @route   GET /api/productImages/:file
// @access  Private
const getProductImage = asyncHandler(async (req, res) => {
    const filename = req.params.file.toString();

    try {
        res.status(200).sendFile(filename, { root: "public/product_images/"});
        
    } catch (error) {
        console.log("Error finding image file.")
        res.status(404).send(`Could not find an image file with the name ${filename}`);
    }  

})

module.exports = getProductImage;