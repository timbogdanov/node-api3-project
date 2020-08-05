const express = require('express');

const server = express();

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `Method: ${req.method} - URL: ${
      req.url
    } - DATE: [${new Date().toISOString()}]`
  );

  next();
}

function validateUserId(id) {
  return function (req, res, next) {
    if (req.header.id === id) {
      req.user = req.body;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' });
    }
  };
}

function validateUser() {
  return function (req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: 'missing user data' });
    } else if (!req.body.name) {
      res
        .status(400)
        .json({ message: 'missing required name field' });
    }

    next();
  };
}

module.exports = server;
