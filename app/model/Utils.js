(function() {
  var Utils;

  Utils = (function() {

    function Utils() {}

    Utils.prototype.isValidEmail = function(email) {
      var pattern, result;
      pattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/;
      result = pattern.exec(email);
      return result !== null;
    };

    Utils.prototype.createUserSession = function(session, email) {
      return session.regenerate(function() {
        session.cookie.maxAge = 100 * 24 * 60 * 60 * 1000;
        session.cookie.httpOnly = false;
        return session.user = email;
      });
    };

    Utils.prototype.destroySession = function(session) {
      session.auth = null;
      return session.destroy(function() {});
    };

    return Utils;

  })();

  module.exports = Utils;

}).call(this);
