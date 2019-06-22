const express = require('express');

const router = express.Router();

const { isAuthenticated } = require('../services/auth-service');
const roomService = require('../services/room-service');
const messageService = require('../services/message-service');

router.get('/', isAuthenticated, async (req, res) => {
  const allRooms = await roomService.findAll(req.user.email);

  res.json({
    status: 'success',
    data: allRooms,
  });
});

router.get('/:id/messages', async (req, res) => {
  const messages = await messageService.findByRoomId(req.params.id);

  res.json({
    status: 'success',
    data: messages,
  });
});

router.post('/', isAuthenticated, async (req, res) => {
  const room = await roomService.save(req.body, req.user.email);

  res.json({
    message: 'created',
    data: room,
  });
});

module.exports = router;
