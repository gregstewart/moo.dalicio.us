(function() {
  var Authenticate, User, UserProvider, expect, mongoose;

  expect = require('expect.js');

  mongoose = require('mongoose');

  User = require('../app/model/UserMongoose');

  UserProvider = require('../app/model/UserProviderMongoose');

  Authenticate = require('../app/model/AuthenticateMongoose');

  describe('test authentication module', function() {
    var authenticate;
    authenticate = null;
    before(function(done) {
      mongoose.connect('mongodb://localhost/test', function() {
        var user;
        User.remove(done);
        user = new User({
          email: 'test@test.com',
          password: 'test'
        });
        return user.save(function() {
          return done;
        });
      });
      return authenticate = new Authenticate(new UserProvider());
    });
    it('should have a test user', function(done) {
      return User.findOne({
        'email': 'test@test.com'
      }, function(err, retrievedUser) {
        retrievedUser.email.should.eql('test@test.com');
        return done();
      });
    });
    return describe('authentication', function() {
      it('should not authenticate a user', function(done) {
        return authenticate.checkUser('test@test.com', 'test2', function(result) {
          expect(result).to.be(false);
          return done();
        });
      });
      return it('should authenticate a user', function(done) {
        return authenticate.checkUser('test@test.com', 'test', function(result) {
          expect(result).to.be(true);
          return done();
        });
      });
    });
  });

}).call(this);
