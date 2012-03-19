(function() {
  var UserProvider;

  UserProvider = (function() {

    function UserProvider() {
      this.dummyData = [];
      this.userCounter = 1;
    }

    UserProvider.prototype.findAll = function(callback) {
      return callback(null, this.dummyData);
    };

    UserProvider.prototype.findById = function(id, callback) {
      var result, _i, _len, _ref;
      result = null;
      _ref = this.dummyData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        if (result._id === id) return callback(null, result);
      }
    };

    UserProvider.prototype.findByUsername = function(username, callback) {
      var result, _i, _len, _ref;
      result = null;
      _ref = this.dummyData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        if (result.user === username) return callback(null, result);
      }
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

  exports.UserProvider = UserProvider;

}).call(this);
