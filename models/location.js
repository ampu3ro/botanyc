const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
  address: String,
});

const Location = mongoose.model('location', locationSchema);

module.exports = Location;
