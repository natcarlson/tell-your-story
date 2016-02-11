var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var crypto = require('crypto');
var storySchema = require('./story');


var UserSchema = mongoose.Schema( {
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  email: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  stories: {stories: [storySchema] }
});



UserSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = bcryptjs.hashSync(this.password, 10);
    }
    return next();
});

UserSchema.methods.authenticate = function(passwordTry, callback) {
    bcryptjs.compare(passwordTry, this.password, function(err, isMatch) {
        if (err) {return callback(err);
        }
        callback(null, isMatch);
    });
};

UserSchema.methods.setToken = function(err, callback) {
    var scope = this;
    crypto.randomBytes(256, function(err, rawToken) {
        scope.token = rawToken;
        scope.save(function() {
          if (err) {return callback(err);
          }
          callback();
        });
    });
};


module.exports = mongoose.model('User', UserSchema);
