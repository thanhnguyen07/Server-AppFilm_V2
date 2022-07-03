const mongoose = require('mongoose');
const { Schema } = mongoose;

const Cast = new Schema({
  nameFilm: {type: String},
  cast: {type: Array}
}, { timestamps: true });

module.exports = mongoose.model('Cast', Cast);