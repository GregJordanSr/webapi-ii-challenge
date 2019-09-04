// Make an API to manage the post and comments

// Declaration or import the express router
const express = require('express');

const postRouter = require('./posts-comments/post-router.js')
const commentsRouter = require('./posts-comments/comments-router.js')

// Declare the server and invoke express method
const server = express();

// Allows you to use the json format
server.use(express.json());

// Makes the router look and the root of the URL, pass it two parameters, 1. the URL and The router name
server.use('/api/posts', postRouter)
server.use('/api/posts', commentsRouter)

// It makes the server listen on the port specified and sends a message to the console.
server.listen(8000, () => console.log('\nServer running on port 8000\n'));

