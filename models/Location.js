const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create data schema and model
const locationSchema = new Schema({
  locId: {
    type: String,
  },
  lat: {
    type: String
  },
  long: {
    type: String
  },
  line: {
    type: String
  },
  sta: {
    type: String
  },
  srcImg: {
    type: String
  },
  comment: {
    type: String
  }
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
