class User

  constructor: (@email) ->
    @id
    @moods = []

  getUserName: ->
    @email

  getId: ->
    @id

  setId: (id) ->
    @id = id

  setMood: (mood) ->
    @moods.push(mood)

  getMoods: ->
    @moods

exports.User = User