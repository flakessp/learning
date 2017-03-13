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
router.get('/:qID', (req, res) => {
    res.json({
        response: `You sent me a GET request for specific ID:${req.params.qID}`
    });
});

// POST /questions/:qID/answers
// Route for creating an answer
router.post('/:qID/answers', (req, res) => {
    res.json({
        response: 'You sent me a POST request to /answers',
        questionId: req.params.qID,
        body: req.body
    });
}); 

// PUT /questions/:qID/answers/:aID
// Edit an answer
router.put('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: 'You sent me a PUT request to /answers',
        questionId: req.params.qID,
        answerId: req.params.aID,
        body: req.body
    });
}); 

// DELETE /questions/:qID/answers/:aID
// delete an answer
router.delete('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: 'You sent me a DELETE request to /answers',
        questionId: req.params.qID,
        answerId: req.params.aID,
    });
}); 

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) => {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else next();
}, (req, res) => {
    const {dir, qID, aID} = req.params;
    res.json({
        response: `You sent me a POST request to /vote-${dir}`,
        questionId: qID,
        answerId: aID,
        vote: dir
    });
}); 

module.exports = router;