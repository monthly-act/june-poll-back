const mongoose = require('mongoose');

const presenterSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: null,
  },
  picture: {
    type: String,
    default: null,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Presenter', presenterSchema);
