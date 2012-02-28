class UserProvider

  constructor: ->
    @dummyData = []
    @userCounter = 1

  findAll: (callback) ->
    callback(null, @dummyData)

  findById: (id, callback) ->
    result = null
    return callback null, result for result in @dummyData when result._id is id

  findByUsername: (username, callback) ->
      result = null
      return callback null, result for result in @dummyData when result.user is username

  save: (users, callback) ->
    user = null

    if typeof users.length ==  'undefined'
      users = [users]

    for user, i in users
      user._id = @userCounter++
      @dummyData[@dummyData.length] = user

    callback(null, users)

exports.UserProvider = UserProvider