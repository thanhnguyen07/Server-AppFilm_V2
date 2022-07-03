const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
  name: {type: String},
  email: {type: String},
  pass: {type: String},
  listLike: {type: Array, default: []},
  listPlay: {type: Array, default: []},
  listCmt: {type: Array, default: []},
  listHistory: {type: Array, default: []},
}, { timestamps: true });

module.exports = mongoose.model('User', User);