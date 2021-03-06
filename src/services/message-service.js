const Message = require('../models/Message');

function findByRoomId(roomId) {
  return Message.aggregate().match({ roomId })
    .project({
      id: '$_id',
      msg: 1,
      status: 1,
      sender: 1,
      roomId: 1,
      createDate: '$create_date',
    })
    .sort({ create_date: 'asc' });
}

async function save({
  msg, status, sender, roomId,
}) {
  const message = new Message();
  message.msg = msg;
  message.status = status;
  message.sender = sender;
  message.roomId = roomId;

  await message.save();

  return message;
}

module.exports = {
  findByRoomId,
  save,
};
