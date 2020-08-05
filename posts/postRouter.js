const express = require('express');

const router = express.Router();

const Posts = require('./postDb');
const { remove } = require('../users/userDb');

router.get('/', (req, res) => {
  Posts.get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch();
});

router.get('/:id', (req, res) => {
  Posts.getById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch();
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then((removedPost) => {
      res.status(200).json({
        message: `records removed ${removedPost}, post id removed ${req.params.id}`,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'cannot remove post' });
    });
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  const postId = req.params.id;

  Posts.get(postId).then((post) => {
    if (post) {
      next();
    } else {
      res.status(404).json({ message: 'cannot find post ' });
    }
  });
}

module.exports = router;
