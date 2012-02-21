class Mood
  constructor:(@submittedValue) ->
    @createdDate = new Date

  getValue: ->
    @submittedValue

exports.Mood = Mood