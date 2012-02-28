MoodProvider = require('../../app/MoodProvider-memory').MoodProvider

describe 'MoodProvider tests', ->
  it 'should save some results to memory', ->
    moodProvider = new MoodProvider
    expect(moodProvider.dummyData.length).toBe(1)

  it 'should return one result from memory using findAll', ->
    moodProvider = new MoodProvider
    moodProvider.findAll((error, docs) ->
      expect(docs.length).toBe(1)
    )

  it 'should return one result with a value of 0.5 from memory using findById', ->
    moodProvider = new MoodProvider
    moodProvider.findById(1, (error, docs) ->
      expect(docs.value).toBe(0.5)
    )

  it 'should save 2 additional records', ->
    moodProvider = new MoodProvider
    moodProvider.save( [{value:0.75, user:'gregs@tcias.co.uk', project:'project name'},
                        {value:0.2, user:'gregs@tcias.co.uk', project:'project name'}], (error, moods)-> )
    moodProvider.findAll((error, docs) ->
      expect(docs.length).toBe(3)
    )