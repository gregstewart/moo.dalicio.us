class MoodProvider

  constructor: ->
    @dummyData = []
    @moodCounter = 1
    @save( [{value:0.5, user:'gregs@tcias.co.uk', project:'project name', date: new Date()}], (error, moods)-> )

  findAll: (callback) ->
    callback(null, @dummyData)

  findById: (id, callback) ->
    result = null
    return callback null, result for result in @dummyData when result._id is id

  save: (moods, callback) ->
    mood = null

    if typeof moods.length ==  'undefined'
      moods = [moods]

    for mood, i in moods
      mood._id = @moodCounter++
      @dummyData[@dummyData.length] = mood

    callback(null, moods)

exports.MoodProvider = MoodProvider