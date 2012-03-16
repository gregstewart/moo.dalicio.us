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
    describe('authentication', function() {
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
    describe('validate email address', function() {
      it('should return true for a valid email address', function() {
        return expect(authenticate.isValidEmail('test@test.com')).to.be(true);
      });
      return it('should return false if email is invalid', function() {
        return expect(authenticate.isValidEmail('testtest.com')).to.be(false);
      });
    });
    return describe('check for existing user', function() {
      it('should return true because the user already exists', function(done) {
        return authenticate.checkUserExists('test@test.com', function(result) {
          expect(result).to.be(true);
          return done();
        });
      });
      it('should return false because the user does not exist', function(done) {
        return authenticate.checkUserExists('test2@test.com', function(result) {
          expect(result).to.be(false);
          return done();
        });
      });
      return describe('no user exists', function() {
        beforeEach(function(done) {
          return User.remove(done);
        });
        return it('should return false', function(done) {
          return authenticate.checkUserExists('test@test.com', function(result) {
            expect(result).to.be(false);
            return done();
          });
        });
      });
    });
  });

}).call(this);
