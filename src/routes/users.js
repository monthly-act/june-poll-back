const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.post('/', function(req, res) {
  res.send(req.body);
});

module.exports = router;
