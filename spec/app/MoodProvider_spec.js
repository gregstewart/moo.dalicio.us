(function() {
  var MoodProvider;

  MoodProvider = require('../../app/MoodProvider-memory').MoodProvider;

  describe('MoodProvider tests', function() {
    var moodProvider;
    moodProvider = null;
    beforeEach(function() {
      moodProvider = new MoodProvider;
      return moodProvider.save([
        {
          value: 0.75,
          user: 'gregs@tcias.co.uk',
          project: 'project name'
        }
      ], function(error, moods) {});
    });
    it('should save one result to memory', function() {
      return expect(moodProvider.dummyData.length).toBe(1);
    });
    it('should return one result from memory using findAll', function() {
      return moodProvider.findAll(function(error, docs) {
        return expect(docs.length).toBe(1);
      });
    });
    it('should save 2 additional records', function() {
      moodProvider.save([
        {
          value: 0.5,
          user: 'gregs@tcias.co.uk',
          project: 'project name'
        }, {
          value: 0.2,
          user: 'gregs@tcias.co.uk',
          project: 'project name'
        }
      ], function(error, moods) {});
      return moodProvider.findAll(function(error, docs) {
        return expect(docs.length).toBe(3);
      });
    });
    it('should return one result with a value of 0.75 from memory using findById', function() {
      return moodProvider.findById(1, function(error, docs) {
        return expect(docs.value).toBe(0.75);
      });
    });
    return describe('find all records for a given user', function() {
      moodProvider = null;
      beforeEach(function() {
        moodProvider = new MoodProvider;
        return moodProvider.save([
          {
            value: 0.75,
            user: 'gregs@tcias.co.uk',
            project: 'project name'
          }, {
            value: 0.2,
            user: 'gregs@tcias.co.uk',
            project: 'project name'
          }, {
            value: 0.3,
            user: 'test@test.com',
            project: 'project name'
          }
        ], function(error, moods) {});
      });
      it('should return 2 records', function() {
        return moodProvider.findByUsername('gregs@tcias.co.uk', function(error, docs) {
          return expect(docs.length).toBe(2);
        });
      });
      return it('should return 1 record', function() {
        return moodProvider.findByUsername('test@test.com', function(error, docs) {
          return expect(docs.length).toBe(1);
        });
      });
    });
  });

}).call(this);
