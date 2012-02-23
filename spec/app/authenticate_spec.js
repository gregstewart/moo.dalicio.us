(function() {
  var Authenticate;

  Authenticate = require('../../app/Authenticate').Authenticate;

  describe('test authentication module', function() {
    var testAuthenticateObject;
    testAuthenticateObject = null;
    beforeEach(function() {
      return testAuthenticateObject = new Authenticate;
    });
    it('should authenticate user', function() {
      return expect(testAuthenticateObject.checkUser('gregs@tcias.co.uk', 'test')).toBeTruthy();
    });
    it('should not authenticate an invalid user', function() {
      return expect(testAuthenticateObject.checkUser('gregs@tcias.co.uk', 'test2')).toBeFalsy();
    });
    return describe('validate email address', function() {
      it('should validate an email address', function() {
        return expect(testAuthenticateObject.isValidEmail('gregs@tcias.co.uk')).toBeTruthy();
      });
      return it('should return false if email is invalid', function() {
        return expect(testAuthenticateObject.isValidEmail('gregstcias.co.uk')).toBeFalsy();
      });
    });
  });

}).call(this);
