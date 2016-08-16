var mongoose = require('mongoose'),
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
    unique: true
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
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

//register a virtual attribute
userSchema.virtual('fullName').get(function(){
  return this.firstName + ' ' + this.lastName;
});

//register the modifiers
userSchema.set('toJson', { getters: true, virtuals: true });


var User = mongoose.model('User', userSchema);

module.exports = User;
