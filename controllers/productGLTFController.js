const asyncHandler = require("express-async-handler");
const path = require("path");

// @desc    Gets the glTF file of a given product
// @route   GET /api/productGLTF/:file
// @access  Private
const getGLTF = asyncHandler(async (req, res) => {
    const filename = req.params.file

    try {
        if(filename.endsWith(".gltf")) {
            res.status(200).sendFile(filename, { root: "public/gltf_files"})
        } else {
            res.status(404).send(`The file ${filename} you are requesting is not a glTF file.`);
        }
    } catch(error) {
        res.status(400).send(`Error processing you request.`);
    }
})

module.exports = getGLTF;
