mongoose = require 'mongoose'
User = require './UserMongoose'

class UserProvider

  constructor: ->
    @user = User

  findAll: (callback) ->
    callback(null, user)

  findByUsername: (username, callback) ->
      @user.findOne {'email':username}, (err, retrievedUser) ->
        return callback err, retrievedUser

  save: (users, callback) ->
    user = null

    if typeof users.length ==  'undefined'
      users = [users]

    for user, i in users
      user._id = @userCounter++
      @dummyData[@dummyData.length] = user

    callback(null, users)


module.exports = UserProvider
