const Room =require("../models/Room");

async function findAll() {
  return await Room.find({});
}

async function save(requestRoom) {
  const room = new Room();
  room.name = requestRoom.name;

  await room.save();

  return room;
}

module.exports = {
  findAll,
  save,
};
