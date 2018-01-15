const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create data schema and model
const photoSchema = new Schema({
  locId: {
    type: String,
  },
  description: {
    type: String,
  },
  imgName: {
    type: String,
  }
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
