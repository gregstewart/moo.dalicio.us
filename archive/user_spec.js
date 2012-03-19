(function() {
  var Mood, User;

  User = require('../../app/User').User;

  Mood = require('../../app/Mood').Mood;

  describe('test user object', function() {
    var defaultEmailAddress, testUser;
    testUser = null;
    defaultEmailAddress = 'test@test.com';
    beforeEach(function() {
      return testUser = new User(defaultEmailAddress);
    });
    it('should create a default user object', function() {
      return expect(testUser.getUserName()).toEqual(defaultEmailAddress);
    });
    it('should return moods', function() {
      return expect(testUser.moods).toBeDefined();
    });
    return it('should add a mood to the user', function() {
      var testMood;
      testMood = new Mood(0.5);
      testUser.setMood(testMood);
      return expect(testUser.getMoods().length).toBe(1);
    });
  });

}).call(this);
