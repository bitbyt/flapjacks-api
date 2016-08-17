var User = require('mongoose').model('User');

module.exports = {
  index: function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) return next(err);
      res.json(users)
    });
  },
  signup: function(req, res) {
    res.send(req.body);

    var userObject = req.body;
    var newUser = new User(userObject);

    newUser.save(function(err, user) {
      if (err) return res.status(4000).send(err);

      return res.status(200).send({
        message: 'User created'
      });
    });
  },
  login: function(req, res) {
    var loggedInUser = req.body;

    User.findOne(loggedInUser, function(err, foundUser) {
        if(err) return res.status(400).send();

        if(foundUser) {
          return res.status(200).send({ message: 'login success' });
        } else {
          return res.status(400).send({ message: 'login failed' });
        }

      });
  },
  create: function(req, res, next) {
    var user = new User(req.body);
    console.log(req.body);
    user.save(function(err) {
      if (err) {
        console.log('error message is: ' + err.errors.email.message);
        var errMessage = {
          "message":  err.errors.email.message,
          "status_code": 400
        }
      } return res.status(400).send(errMessage);
      res.json(user)
    });
  },
  show: function(req, res) {
    User.findOne({ username: req.params.id }, function(err, user) {
      if (err) return next(err);
      res.json(user);
    });
  },
  update: function(req, res) {
    var username = req.params.id;
    User.findByIdAndUpdate(username, req.body, function(err, user) {
      if (err) return next(err);

      User.findOne({ _id: username },function(err, user) {
        if (err) return next(err);
        res.json(user);
      });
    });
  },
  destroy: function(req, res, next) {
    User.remove({ username: req.params.id }, function(err, user) {
      if (err) return next(err);
      res.json({message: 'Successfully Deleted'})
    })
  }
}
