var User = require('mongoose').model('User');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports = {
  index: function(req, res, next) {
    User.find({}, function(err, users) {
      if (err) return next(err);
      res.json(users)
    });
  },
  signup: function(req, res) {
    //res.send(req.body);

    var userObject = req.body;
    var newUser = new User(userObject);

    newUser.save(function(err, user) {
      if (err) return res.status(400).send(err);

      return res.status(200).send({
        message: 'User created'
      });
    });
  },
  login: function(req, res) {
    var loggedInUser = req.body;

    User.findOne(
      { email: loggedInUser.email },
      function(err, foundUser) {
      // this is error find flow
      if (err) return res.status(400).send(err);
      if(foundUser) {
        foundUser.authenticate(loggedInUser.password, function(err, isMatch) {
          // console.log('password comparison is: ', isMatch);
          if (isMatch) {
            // return res.status(200).send({message: "Valid credentials !"});
            var payload = {
              id: foundUser.id,
              email: foundUser.email
            };
            var expiryObj = {
              exp: 60 * 3
            }
            var jwtToken = jwt.sign(payload, config.jwtSecret, expiryObj);

            return res.status(200).send(jwtToken);
          } else {
            return res.status(401).send({message: "Login failed"});
          };
        });
      } else {
        return res.status(400).send({ message: 'User not found' });
      }
    // loggedInUser, function(err, foundUser) {
    //     if(err) return res.status(400).send();

        // if(foundUser) {
        //   var payload = foundUser.id;
        //   var expiryObj = {
        //     expiryInMinutes: 320
        //   };
        //   var jwtToken = jwt.sign(payload, config.jwtSecret, expiryObj);
        //
        //   return res.status(200).send(jwtToken);
        // } else {
        //   return res.status(400).send({ message: 'login failed' });
        // }

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
