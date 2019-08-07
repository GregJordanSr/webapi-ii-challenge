// Declares or imports the router onto express.
const router = require('express').Router();

// import the database
const postComments = require('../data/db');


router.post('/', (req, res) => {
    const blogInfo = req.body;
    const { title, contents } = req.body;

    if (title && contents) {
        postComments.insert(blogInfo)
            .then(blogInfo => {
                res.status(201).json(blogInfo)
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
})

router.get('/', (req, res) => {
    postComments.find()
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    postComments.findById(id)
})






// export default router;
module.exports = router;