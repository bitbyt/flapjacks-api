var Event = require('mongoose').model('Event');

module.exports = {
  index: function(req, res) {
    Event.find({}, function(err, events) {
      if (err) return next(err);
      res.json(events)
    });
  },
  create: function(req, res) {
    var event = new Event();
    event.name = req.body.name;

    event.save(function(err) {
      if (err) return next(err);

      res.json({ message: 'Event created!' })
    })
  },
  show: function(req, res) {
    res.send('A event')
  },
  update: function(req, res) {
    res.send('Update event')
  },
  destroy: function(req, res) {
    res.send('Destroy event')
  }
}
