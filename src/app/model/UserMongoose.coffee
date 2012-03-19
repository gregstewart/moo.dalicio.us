mongoose = require 'mongoose',
crypto = require('crypto')

validatePresenceOf= (value) ->
  value && value.length;

User = new mongoose.Schema(
  email:  {type: String, validate: [validatePresenceOf, 'an email is required'], index: {unique: true}}
  hashed_password: String
  salt: String
)

User.virtual('password')
  .set( (password) ->
    @_password = password
    @salt = @makeSalt()
    @hashed_password = @encryptPassword(password)
  )
  .get( ->
    @_password
  )

User.method 'authenticate', (plainText) ->
  @encryptPassword(plainText) == @hashed_password;

User.method 'makeSalt', ->
  Math.round((new Date().valueOf() * Math.random())) + ''

User.method 'encryptPassword', (password) ->
  crypto.createHmac('sha1', @salt).update(password).digest('hex');

User.method 'isValidEmail', (email) ->
  pattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/
  result = pattern.exec(email);
  if result == null then return false
  return true


#User.pre('save', (next)->
#  if (!validatePresenceOf(@password))
#    next(new Error('Invalid password'))
#  else
#    next
#)

module.exports = mongoose.model 'User', User