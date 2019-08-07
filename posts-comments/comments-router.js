// Declares or imports the router onto express.
const router = require('express').Router();

// import the database
const postComments = require('../data/db');

// Add a comment to the database by ID
router.post('/:id/comments', (req, res) => {
    const commentBody = req.body;
    const  post_id  = req.params.id;
    
if (commentBody.text) {
    postComments.insertComment(commentBody )
        .then(comment => {
            if (comment) {
                res.status(201).json(commentBody);
            } else {
                res.status(500).json({ message: "There was error saving the comment to the database." })
            }
        }) 
        .catch(error => {
            res.status(404).json({ message: "The post with the specified ID does not exist"});
        })  
} else {
    res.status(400).json({ message: "Please provide text for the comment. "})
}
})

// Returns an arry of the comments fro the post with the specified ID
router.get('/:id/comments', (req, res) => {
    const commentId = req.params.id;

    postComments.findPostComments(commentId)
    .then(comment => {
        if (!commentId) {
            res.status(404).json({ message: "The post with the specified ID does not exist."  })
        } else {
            res.status(200).json(commentId)
        }
        .catch( error => {
            res.status(500).json({ error: "The comments information could not be retrieved. "})
        })
    });
    
});

// export default router;
module.exports = router;