const mongoose = require('mongoose');
const { Schema } = mongoose;
const FARM_FIELDS = require('./data');

const farmSchema = new Schema(FARM_FIELDS, { timestamps: true });

const Farm = mongoose.model('farm', farmSchema);

module.exports = Farm;
