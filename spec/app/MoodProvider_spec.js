(function() {
  var MoodProvider;

  MoodProvider = require('../../app/MoodProvider').MoodProvider;

  describe('MoodProvider tests', function() {
    it('should save some results to memory', function() {
      var moodProvider;
      moodProvider = new MoodProvider;
      return expect(moodProvider.dummyData.length).toBe(1);
    });
    it('should return one result from memory using findAll', function() {
      var moodProvider;
      moodProvider = new MoodProvider;
      return moodProvider.findAll(function(error, docs) {
        return expect(docs.length).toBe(1);
      });
    });
    it('should return one result with a value of 0.5 from memory using findById', function() {
      var moodProvider;
      moodProvider = new MoodProvider;
      return moodProvider.findById(1, function(error, docs) {
        return expect(docs.value).toBe(0.5);
      });
    });
    return it('should save 2 additional records', function() {
      var moodProvider;
      moodProvider = new MoodProvider;
      moodProvider.save([
        {
          value: 0.75
        }, {
          value: 0.2
        }
      ], function(error, moods) {});
      return moodProvider.findAll(function(error, docs) {
        return expect(docs.length).toBe(3);
      });
    });
  });

}).call(this);
