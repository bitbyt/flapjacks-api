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
  }
}, {
  timestamps: {}
});

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
}

//register the modifiers
userSchema.set('toJson', { getters: true, virtuals: true });

//register the schema
var User = mongoose.model('User', userSchema);

module.exports = User;
