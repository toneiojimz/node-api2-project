const express = require('express');

const Posts = require('../data/db'); // don't forget to import anything needed

const router = express.Router();

// a Router can have middleware
// a Router can have endpoints

// this router only cares about whatever comes after /
router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
});


//GET posts by id
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
});


//POST a post to posts !!
// server.post('/api/posts', function(req, res) {
//     const postData = req.body;

//     Posts.insert(postData)
//     .then(post => {
//         res.status(201).json(post);
//     })
//     .catch(error => {
//         console.log(error);
        
//         res.status(500).json({
//             error: "There was an error while saving the post to the database" 
//         });
//     });

//      //handling if title or contents is missing
//      if (!postData.title || !postData.contents) {
//         res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
//     }
// });


//DELETE a post by specific id
router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been nuked' });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post could not be removed"
      });
    });
});



//PUT  To update the post data  by specific id. Modified post is returned

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    
    Posts.findById(id)
    .then(findPost => {
        if (!findPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist."});
        }
    })

    if (!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
    }

    const title = req.body.title;
    const contents = req.body.contents;
    const sendObject = {title, contents};
    Users.update(id, sendObject)
    .then(updatedPost => {
        Users.findById(id)
        .then(response => {
            res.status(200).json(response);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The post information could not be modified."} )
    })
})

// add an endpoint that returns all the messages for a post
// add an endpoint for adding new message to a post

module.exports = router;

// create file for the Router
// write code to create a router: require('express').Router();
// export it
// require and use the router on server.js: server.use('/api/posts', postsRouter)