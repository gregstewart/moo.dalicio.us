(function() {
  var User, UserProvider, mongoose;

  mongoose = require('mongoose');

  User = require('../app/model/UserMongoose');

  UserProvider = require('../app/model/UserProviderMongoose');

  describe('User', function() {
    before(function(done) {
      return mongoose.connect('mongodb://localhost/test', function() {
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
    });
    it('should have a test user', function(done) {
      return User.findOne({
        'email': 'test@test.com'
      }, function(err, retrievedUser) {
        retrievedUser.email.should.eql('test@test.com');
        return done();
      });
    });
    return describe('test user provider object', function() {
      var email, userProvider;
      userProvider = null;
      email = 'test@test.com';
      beforeEach(function() {
        return userProvider = new UserProvider();
      });
      return it('should find a user by username', function(done) {
        return userProvider.findByUsername(email, function(err, user) {
          user.email.should.eql(email);
          return done();
        });
      });
    });
  });

}).call(this);
