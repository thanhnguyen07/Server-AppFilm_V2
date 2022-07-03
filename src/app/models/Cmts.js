const mongoose = require('mongoose');
const { Schema } = mongoose;

const Cmts = new Schema({
  idFilm: {type: String},
  idUser: {type: String},
  nameUser: {type: String},
  content: {type: String}
}, { timestamps: true });

module.exports = mongoose.model('Cmts', Cmts);