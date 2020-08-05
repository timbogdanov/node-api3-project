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
  return function validateUserId(req, res, next) {
    if (req.header.id === id) {
      req.user = req.header.id;
      next();
    } else {
      res.status(400).json({ message: 'invalid user id' });
    }
  };
}

module.exports = server;
