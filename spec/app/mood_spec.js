(function() {
  var Mood;

  Mood = require('../../app/Mood').Mood;

  describe('mood capture', function() {
    var testMoodObject;
    testMoodObject = null;
    beforeEach(function() {
      return testMoodObject = new Mood(0.5);
    });
    it('should have a mood value attribute', function() {
      return expect(testMoodObject.submittedValue).toBeDefined();
    });
    it('should have a mood value', function() {
      return expect(testMoodObject.submittedValue).not.toBeNull();
    });
    return it('should have a date value', function() {
      return expect(testMoodObject.createDate).not.toBeNull();
    });
  });

}).call(this);
