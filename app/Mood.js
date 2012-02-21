(function() {
  var Mood;

  Mood = (function() {

    function Mood(submittedValue) {
      this.submittedValue = submittedValue;
      this.createdDate = new Date;
    }

    Mood.prototype.getValue = function() {
      return this.submittedValue;
    };

    return Mood;

  })();

  exports.Mood = Mood;

}).call(this);
