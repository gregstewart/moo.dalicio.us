(function() {
  var User, UserProvider, mongoose;

  mongoose = require('mongoose');

  User = require('./UserMongoose');

  UserProvider = (function() {

    function UserProvider() {
      this.user = User;
    }

    UserProvider.prototype.findAll = function(callback) {
      return callback(null, user);
    };

    UserProvider.prototype.findByUsername = function(username, callback) {
      return this.user.findOne({
        'email': username
      }, function(err, retrievedUser) {
        return callback(err, retrievedUser);
      });
    };

    UserProvider.prototype.save = function(users, callback) {
      var i, user, _len;
      user = null;
      if (typeof users.length === 'undefined') users = [users];
      for (i = 0, _len = users.length; i < _len; i++) {
        user = users[i];
        user._id = this.userCounter++;
        this.dummyData[this.dummyData.length] = user;
      }
      return callback(null, users);
    };

    return UserProvider;

  })();

  module.exports = UserProvider;

}).call(this);
