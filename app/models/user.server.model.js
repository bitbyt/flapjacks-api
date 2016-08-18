var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: [true, 'Email not found'],
    match: /.+\@.+\..+/
  },
  password: {
    type: String,
    required: true,
    validate: [
      function(password) {
        return password.length >= 6;
      },
      'Password is too short'
    ]
  },
  website: {
    type: String,
    trim: true,
    set: function(url) {
      if(! url) {
        return url;
      } else {
        if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }
        return url;
      }
    }
  }
}, {
  timestamps: {}
});

//pre save middleware
userSchema.pre('save', function(){
  //encrypt passwords
  var user = this;
  var saltRounds = 5;
  //generate the bcrypt salt
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      //store has in your password BD
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.authenticate = function(postedPassword, callback) {
  bcrypt.compare(postedPassword, this.password, function(err, isMatch) {
    callback(null, isMatch);
  });
}

//register a virtual attribute
userSchema.virtual('fullName')
.get(function(){
  return this.firstName + ' ' + this.lastName;
})
.set(function(fullName) {
  var splitName = fullName.split(" ");
  this.firstName = splitName[0];
  this.lastName = splitName[1];
});

//search by name
userSchema.query = {
  byName: function(name) {
    return this.find({
      $or: [
        {firstName: new RegExp(name , 'i')},
        {lastName: new RegExp(name , 'i')}
      ]
    });
  }
};

//register the modifiers
userSchema.set('toJson', { getters: true, virtuals: true });

//register the schema
var User = mongoose.model('User', userSchema);

module.exports = User;
