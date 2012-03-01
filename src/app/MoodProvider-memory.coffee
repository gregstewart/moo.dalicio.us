class MoodProvider

  constructor: ->
    @dummyData = []
    @moodCounter = 1

  findAll: (callback) ->
    callback(null, @dummyData)

  findById: (id, callback) ->
    result = null
    return callback null, result for result in @dummyData when result._id is id

  findByUsername: (username, callback) ->
      result = null
      results = []
      results.push result for result in @dummyData when result.user is username

      callback null, results

  save: (moods, callback) ->
    mood = null

    if typeof moods.length ==  'undefined'
      moods = [moods]

    for mood, i in moods
      mood._id = @moodCounter++
      @dummyData[@dummyData.length] = mood

    callback(null, moods)

exports.MoodProvider = MoodProvider