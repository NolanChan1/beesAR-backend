const express = require('express');
const router = express.Router();
const data = require('../../Data');

// Gets all data
router.get("/", (req, res) => res.json(data));

// Get single data
router.get('/:id', (req, res) => {
    const found = data.some(data => data.id === parseInt(req.params.id));

    if (found) {
        res.json(data.filter(data => data.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No data with the id of ${req.params.id}` })
    }
})

module.exports = router;