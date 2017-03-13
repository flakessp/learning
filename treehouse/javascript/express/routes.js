const express = require('express');
const router = express.Router();

// GET /questions
// Return questions collection
router.get('/', (req, res) => {
    res.json({
        response: 'You sent me a GET request'
    });
}); 

// POST /questions
// Route for creating questions
router.post('/', (req, res) => {
    res.json({
        response: 'You sent me a POST request',
        body: req.body
    });
}); 

// POST /questions
// Route for specific questions
router.get('/:id', (req, res) => {
    res.json({
        response: `You sent me a GET request for specific ID:${req.params.id}`
    });
}); 

module.exports = router;