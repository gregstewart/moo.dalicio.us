(function() {
  var Mood;

  Mood = (function() {

    function Mood() {}

    Mood.prototype.getMoods = function(callback) {
      return $.ajax({
        type: "GET",
        url: "http://localhost:3000/get/moods/",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: callback,
        statusCode: {
          403: function() {}
        }
      });
    };

    return Mood;

  })();

  window.Mood = Mood;

}).call(this);
