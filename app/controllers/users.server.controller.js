var User = require('mongoose').model('User');

module.exports = {
  index: function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) return next(err);
      res.json(users)
    });
  },
  create: function(req, res, next) {
    var user = new User(req.body);
    console.log(req.body);
    user.save(function(err) {
      if (err) return next(err);
      res.json(user)
    });
  },
  show: function(req, res) {
    User.findOne({ username: req.params.id }, function(err, user) {
      if (err)
          res.send(err);
      res.json(user);
    });
  },
  update: function(req, res) {
  },
  destroy: function(req, res, next) {
    User.remove({ username: req.params.id }, function(err, user) {
      if (err) return next(err);
      res.json({message: 'Successfully Deleted'})
    })
  }
}
