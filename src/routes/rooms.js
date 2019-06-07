const express = require('express');
const router = express.Router();

const roomService = require('../services/room-service');

router.get('/', async function(req, res) {
  const allRooms = await roomService.findAll();

  res.json({
    status: "success",
    data: allRooms
  });
});

router.post('/', async function(req, res) {
  const room = await roomService.save(req.body);

  res.json({
    message: 'created',
    data: room
  });
});

module.exports = router;
