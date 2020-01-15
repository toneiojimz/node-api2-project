const express = require('express');

const postsRouter = require('../routers/router.js');


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Here are the posts</h2>
  `)
});

// requests to routes that begin with /api/
server.use('/api/posts', postsRouter);


module.exports = server;