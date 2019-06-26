const io = require('socket.io')(process.env.SOCKET_PORT);
const messageService = require('../services/message-service');

io.origins((origin, callback) => {
  if (origin !== process.env.FRONTEND_URL) {
    console.log('origin not allowed');
    return callback('origin not allowed', false);
  }
  return callback(null, true);
});

io.on('connection', (socket) => {
  const room = socket.handshake.query.r_var;
  socket.join(room);

  io.to(room).emit('connected_user_count', io.sockets.adapter.rooms[room].length);

  socket.on('message', async ({
    msg, status, sender, roomId,
  }, fn) => {
    const { _id: id, create_date: createDate } = await messageService.save({
      msg, status, sender, roomId,
    });

    fn('ok');
    io.to(room).emit('message', {
      id, msg, status, sender, createDate,
    });
  });

  socket.on('disconnected', () => {
    socket.leave(room);
    console.log('user disconnected');

    io.to(room).emit('connected_user_count', io.sockets.adapter.rooms[room].length);
  });
});

module.exports = io;
