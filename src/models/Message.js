const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
