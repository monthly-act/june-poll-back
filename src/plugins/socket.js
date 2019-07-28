const io = require('socket.io')(process.env.SOCKET_PORT);
const messageService = require('../services/message-service');

io.origins((origin, callback) => {
  if (origin !== process.env.FRONTEND_URL) {
    console.error('origin not allowed');
    return callback('origin not allowed', false);
  }
  return callback(null, true);
});

function emitUserCountToRoom(room) {
  const roomAdapter = io.sockets.adapter.rooms[room];
  if (roomAdapter) {
    io.to(room).emit('connected_user_count', roomAdapter.length);
  }
}

io.on('connection', (socket) => {
  const room = socket.handshake.query.r_var;
  socket.join(room);

  emitUserCountToRoom(room);

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

    emitUserCountToRoom(room);
  });
});

module.exports = io;
