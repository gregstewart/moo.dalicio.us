(function() {
  var User, mongoose;

  mongoose = require('mongoose');

  User = new mongoose.Schema({
    email: String,
    password: String
  });

  module.exports = mongoose.model('User', User);

}).call(this);
