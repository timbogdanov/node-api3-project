const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

const postsRouter = require('../posts/postRouter');

router.post('/', validateUser, (req, res) => {
  Users.insert(req.user)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json({ message: 'unable to submit data' });
    });
});

router.post('/:id/posts', validateUserId, (req, res) => {
  const newPost = { ...req.body, user_id: req.params.id };

  Posts.insert(newPost)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({ message: 'unable to submit post data' });
    });
});

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
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
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
    req.user = req.body;
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
