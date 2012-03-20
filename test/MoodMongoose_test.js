(function() {
  var Mood, mongoose;

  mongoose = require('mongoose');

  Mood = require('../app/model/MoodMongoose');

  describe('Mood', function() {
    before(function(done) {
      return mongoose.connect('mongodb://localhost/test', function() {
        return Mood.remove(done);
      });
    });
    it('should save a mood submission', function(done) {
      var mood;
      mood = new Mood({
        value: 0.5,
        user: 'test@test.com',
        project: 'your project'
      });
      return mood.save(function() {
        return Mood.findOne({
          _id: mood._id
        }, function(err, retrievedMood) {
          retrievedMood.value.toString().should.eql('0.5');
          retrievedMood.user.should.eql('test@test.com');
          retrievedMood.project.should.eql('your project');
          return done();
        });
      });
    });
    it('should not save a mood submission with a value less than 0', function(done) {
      var mood;
      mood = new Mood({
        value: -1,
        user: 'test@test.com',
        project: 'your project'
      });
      return mood.save(function(error) {
        var message;
        message = error.errors.value.message;
        message.should.eql('Validator "min" failed for path value');
        return done();
      });
    });
    return it('should not save a mood submission with a value greater than 1', function(done) {
      var mood;
      mood = new Mood({
        value: 2,
        user: 'test@test.com',
        project: 'your project'
      });
      return mood.save(function(error) {
        var message;
        message = error.errors.value.message;
        message.should.eql('Validator "max" failed for path value');
        return done();
      });
    });
  });

}).call(this);
