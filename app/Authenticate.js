(function() {
  var Authenticate;

  Authenticate = (function() {

    function Authenticate() {}

    Authenticate.prototype.checkUser = function(email, password) {
      if (email === 'gregs@tcias.co.uk' && password === 'test') {
        return true;
      } else {
        return false;
      }
    };

    Authenticate.prototype.isValidEmail = function(email) {
      var pattern, result;
      pattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/;
      result = pattern.exec(email);
      if (result === null) return false;
      return true;
    };

    return Authenticate;

  })();

  exports.Authenticate = Authenticate;

}).call(this);