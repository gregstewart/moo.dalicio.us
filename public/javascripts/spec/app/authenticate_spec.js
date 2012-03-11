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
    describe('validate email address', function() {
      it('should validate an email address', function() {
        return expect(testAuthenticateObject.isValidEmail('test@test.com')).toBeTruthy();
      });
      return it('should return false if email is invalid', function() {
        return expect(testAuthenticateObject.isValidEmail('testtest.com')).toBeFalsy();
      });
    });
    return describe('check for existing user', function() {
      it('should return true because user already exists', function() {
        return expect(testAuthenticateObject.checkUserExists('test@test.com')).toBeTruthy();
      });
      it('should return false because user does not exists', function() {
        return expect(testAuthenticateObject.checkUserExists('test2@test.com')).toBeFalsy();
      });
      return it('should return false because no user exists', function() {
        var anotherAuthenticateObject, anotherUserProvider;
        anotherUserProvider = new UserProvider;
        anotherAuthenticateObject = new Authenticate(anotherUserProvider);
        expect(anotherUserProvider.dummyData.length).toBe(0);
        return expect(anotherAuthenticateObject.checkUserExists('test2@test.com')).toBeFalsy();
      });
    });
  });

}).call(this);
