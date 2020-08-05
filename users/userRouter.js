const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

const postsRouter = require('../posts/postRouter');

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({
        message: 'unable to submit data',
        error: error.message,
      });
    });
});

router.post(
  '/:id/posts',
  validateUserId,
  validatePost,
  (req, res) => {
    const newPost = { ...req.body, user_id: req.headers.id };

    Posts.insert(newPost)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch((error) => {
        res.status(500).json({
          message: 'unable to submit post data',
          error: error.message,
        });
      });
  }
);

router.get('/', (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ message: 'cannot fetch users' });
    });
});

router.get('/:id', (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'cannot fetch user', error: error.message });
    });
});

router.get('/:id/posts', (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(404).json({
        message: `posts for ${req.params.id} not found`,
        error: error.message,
      });
    });
});

router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then((deleted) => {
      res
        .status(201)
        .json({ message: `deleted user id: ${req.params.id}` });
    })
    .catch((error) => {
      res.status(500).json({
        message: `unable to delete user id: ${req.params.id}`,
      });
    });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then((updatedUser) => {
      res.status(200).json({
        message: `updated user with id: ${req.params.id}, records updated: ${updatedUser}`,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: `unable to delete user id: ${req.params.id}`,
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;

  if (req.headers.id === id) {
    next();
  } else {
    res.status(400).json({ message: 'invalid user id' });
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else if (!req.body) {
    res.status(400).json({ message: 'missing user data' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = router;
