(function() {
  var User, crypto, mongoose, validatePresenceOf;

  mongoose = require('mongoose', crypto = require('crypto'));

  validatePresenceOf = function(value) {
    return value && value.length;
  };

  User = new mongoose.Schema({
    email: {
      type: String,
      validate: [validatePresenceOf, 'an email is required'],
      index: {
        unique: true
      }
    },
    hashed_password: String,
    salt: String
  });

  User.virtual('password').set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    return this.hashed_password = this.encryptPassword(password);
  }).get(function() {
    return this._password;
  });

  User.method('authenticate', function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  });

  User.method('makeSalt', function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  });

  User.method('encryptPassword', function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  });

  User.method('isValidEmail', function(email) {
    var pattern, result;
    pattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/;
    result = pattern.exec(email);
    if (result === null) return false;
    return true;
  });

  module.exports = mongoose.model('User', User);

}).call(this);
