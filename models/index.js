const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  keepAlive: true,
});

module.exports.User = require('./user');
module.exports.Location = require('./location');
module.exports.Farm = require('./farm');
