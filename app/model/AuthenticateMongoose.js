(function() {
  var Authenticate;

  Authenticate = (function() {

    function Authenticate(userProvider) {
      this.userProvider = userProvider;
    }

    Authenticate.prototype.checkUser = function(email, password, callback) {
      this.userProvider.findByUsername(email, function(error, user) {
        return callback(email === user.email && password === user.password);
      });
    };

    Authenticate.prototype.checkUserExists = function(email) {
      return this.userProvider.findByUsername(email, function(error, user) {
        if (typeof user.user === 'object' || user === null) return false;
        return true;
      });
    };

    Authenticate.prototype.isValidEmail = function(email) {
      var pattern, result;
      pattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/;
      result = pattern.exec(email);
      if (result === null) return false;
      return true;
    };

    Authenticate.prototype.createUserSession = function(session, email) {
      return session.regenerate(function() {
        session.cookie.maxAge = 100 * 24 * 60 * 60 * 1000;
        session.cookie.httpOnly = false;
        return session.user = email;
      });
    };

    Authenticate.prototype.destroySession = function(session) {
      session.auth = null;
      return session.destroy(function() {});
    };

    return Authenticate;

  })();

  module.exports = Authenticate;

}).call(this);
