const Room = require('../models/Room');

function findByLink(link) {
  return Room.findOne({ link });
}

function findAll(email) {
  return Room.find({ owner: email }).sort({ create_date: -1 });
}

async function save({ title, link }, email) {
  const room = new Room();
  room.title = title;
  room.link = link;
  room.owner = email;
  room.open = true;

  await room.save();

  return room;
}

module.exports = {
  findByLink,
  findAll,
  save,
};
