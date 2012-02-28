(function() {
  var Authenticate, UserProvider;

  Authenticate = require('../../app/Authenticate').Authenticate;

  UserProvider = require('../../app/UserProvider-memory').UserProvider;

  describe('test authentication module', function() {
    var testAuthenticateObject;
    testAuthenticateObject = null;
    beforeEach(function() {
      var userProvider;
      userProvider = new UserProvider;
      userProvider.save([
        {
          user: 'test@test.com',
          password: 'test'
        }
      ], function(error, users) {});
      return testAuthenticateObject = new Authenticate(userProvider);
    });
    it('should authenticate user', function() {
      return expect(testAuthenticateObject.checkUser('test@test.com', 'test')).toBeTruthy();
    });
    it('should not authenticate an invalid user', function() {
      return expect(testAuthenticateObject.checkUser('test@test.com', 'test2')).toBeFalsy();
    });
    return describe('validate email address', function() {
      it('should validate an email address', function() {
        return expect(testAuthenticateObject.isValidEmail('test@test.com')).toBeTruthy();
      });
      return it('should return false if email is invalid', function() {
        return expect(testAuthenticateObject.isValidEmail('testtest.com')).toBeFalsy();
      });
    });
  });

}).call(this);
