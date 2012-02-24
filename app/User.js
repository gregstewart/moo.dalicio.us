(function() {
  var User;

  User = (function() {

    function User(email) {
      this.email = email;
      this.id;
      this.moods = [];
    }

    User.prototype.getUserName = function() {
      return this.email;
    };

    User.prototype.getId = function() {
      return this.id;
    };

    User.prototype.setId = function(id) {
      return this.id = id;
    };

    User.prototype.setMood = function(mood) {
      return this.moods.push(mood);
    };

    User.prototype.getMoods = function() {
      return this.moods;
    };

    return User;

  })();

  exports.User = User;

}).call(this);
