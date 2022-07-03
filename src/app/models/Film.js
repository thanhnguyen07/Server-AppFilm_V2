const mongoose = require('mongoose');
const { Schema } = mongoose;

const Film = new Schema({
  nameEn: {type: String},
  nameVn: {type: String},
  content: {type: String},
  country: {type: String},
  releaseDay: {type: String},
  status: {type: String},
  idTrailer: {type: String},
  type: {type: String},
  idImageVideo: {type: String},
  castId : {type: String},
  
  imagesNumber: {type: Number},
  point: {type: Number, default:0},
  durations: {type: Number},
  
  genre: {type: Array, default: []},
  listCmt: {type: Array, default: []},

}, { timestamps: true });

module.exports = mongoose.model('Film', Film);