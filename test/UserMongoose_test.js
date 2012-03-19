(function() {
  var User, mongoose;

  mongoose = require('mongoose');

  User = require('../app/model/UserMongoose');

  describe('User', function() {
    before(function(done) {
      return mongoose.connect('mongodb://localhost/test', function() {
        return User.remove(done);
      });
    });
    it('should create a new user ', function(done) {
      var user;
      user = new User({
        email: 'test@test.com',
        password: 'test'
      });
      return user.save(function() {
        return User.findOne({
          _id: user._id
        }, function(err, retrievedUser) {
          var hashed;
          retrievedUser.email.should.eql('test@test.com');
          hashed = retrievedUser.encryptPassword('test');
          retrievedUser.hashed_password.should.eql(hashed);
          return done();
        });
      });
    });
    it('should not create the same user twice', function(done) {
      var user;
      user = new User({
        email: 'test@test.com',
        password: 'test'
      });
      return user.save(function(error) {
        error.err.should.eql('E11000 duplicate key error index: test.users.$email_1  dup key: { : "test@test.com" }');
        return done();
      });
    });
    return it('should authenticate a user', function(done) {
      return User.findOne({
        'email': 'test@test.com'
      }, function(error, retrievedUser) {
        retrievedUser.should.not.eql(null);
        retrievedUser.authenticate('test').should.eql(true);
        return done();
      });
    });
  });

}).call(this);
