var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
  name: String,
  email: String
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
