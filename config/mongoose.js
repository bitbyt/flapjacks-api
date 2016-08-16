var config = require('./config'),
    mongoose = require('mongoose');
    
mongoose.Promise = global.Promise;

module.exports = function() {
  var db = mongoose.connect(config.db);
  require('../app/models/user.server.model');
  require('../app/models/event.server.model');
  return db;
}
