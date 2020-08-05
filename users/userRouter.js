const express = require('express');

const Users = require('./userDb');

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

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  res.status(200).json({ message: 'sup' });
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
  if (req.header.id === id) {
    req.user = req.body;
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
