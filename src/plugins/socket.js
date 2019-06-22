const io = require('socket.io')(process.env.SOCKET_PORT);
const messageService = require('../services/message-service');

// TODO origin
// io.origins((origin, callback) => {
//   if (origin !== process.env.FRONTEND_URL) {
//     return callback('origin not allowed', false);
//   }
//   callback(null, true);
// });

io.on('connection', (socket) => {
  console.log('connected : ', Object.keys(io.sockets.clients().connected).length);

  const room = socket.handshake.query.r_var;

  socket.join(room);

  socket.on('message', async ({
    msg, status, sender, roomId,
  }) => {
    const id = await messageService.save({
      msg, status, sender, roomId,
    });

    io.to(room).emit('message', {
      id, msg, status, sender,
    });
  });

  socket.on('disconnected', () => {
    socket.leave(room);
    console.log('user disconnected');
  });
});

module.exports = io;
