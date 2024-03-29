(function() {
  var MoodProvider;

  MoodProvider = (function() {

    function MoodProvider() {
      this.dummyData = [];
      this.moodCounter = 1;
    }

    MoodProvider.prototype.findAll = function(callback) {
      return callback(null, this.dummyData);
    };

    MoodProvider.prototype.findById = function(id, callback) {
      var result, _i, _len, _ref;
      result = null;
      _ref = this.dummyData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        if (result._id === id) return callback(null, result);
      }
    };

    MoodProvider.prototype.findByUsername = function(username, callback) {
      var result, results, _i, _len, _ref;
      result = null;
      results = [];
      _ref = this.dummyData;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        result = _ref[_i];
        if (result.user === username) results.push(result);
      }
      return callback(null, results);
    };

    MoodProvider.prototype.save = function(moods, callback) {
      var i, mood, _len;
      mood = null;
      if (typeof moods.length === 'undefined') moods = [moods];
      for (i = 0, _len = moods.length; i < _len; i++) {
        mood = moods[i];
        mood._id = this.moodCounter++;
        this.dummyData[this.dummyData.length] = mood;
      }
      return callback(null, moods);
    };

    return MoodProvider;

  })();

  exports.MoodProvider = MoodProvider;

}).call(this);
