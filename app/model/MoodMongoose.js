(function() {
  var Mood, mongoose;

  mongoose = require('mongoose');

  Mood = new mongoose.Schema({
    value: {
      type: Number,
      min: 0,
      max: 1
    },
    user: String,
    project: String,
    date: {
      type: Date,
      "default": Date.now
    }
  });

  module.exports = mongoose.model('Mood', Mood);

}).call(this);
