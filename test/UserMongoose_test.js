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
    return it('should create a new user ', function(done) {
      var user;
      user = new User({
        email: 'test@test.com',
        password: 'test'
      });
      return user.save(function() {
        return User.findOne({
          _id: user._id
        }, function(err, retrievedUser) {
          retrievedUser.email.should.eql('test@test.com');
          retrievedUser.password.should.eql('test');
          return done();
        });
      });
    });
  });

}).call(this);
