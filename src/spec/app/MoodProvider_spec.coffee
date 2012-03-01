MoodProvider = require('../../app/MoodProvider-memory').MoodProvider

describe 'MoodProvider tests', ->
  moodProvider = null

  beforeEach ->
    moodProvider = new MoodProvider
    moodProvider.save( [{value:0.75, user:'gregs@tcias.co.uk', project:'project name', dateAdded: new Date()}], (error, moods)-> )

  it 'should save one result to memory', ->
    expect(moodProvider.dummyData.length).toBe(1)

  it 'should return one result from memory using findAll', ->
    moodProvider.findAll((error, docs) ->
      expect(docs.length).toBe(1)
    )

  it 'should save 2 additional records', ->
    moodProvider.save( [{value:0.5, user:'gregs@tcias.co.uk', project:'project name', dateAdded: new Date()},
                        {value:0.2, user:'gregs@tcias.co.uk', project:'project name', dateAdded: new Date()}], (error, moods)-> )
    moodProvider.findAll((error, docs) ->
      expect(docs.length).toBe(3)
    )

  it 'should return one result with a value of 0.75 from memory using findById', ->
    moodProvider.findById(1, (error, docs) ->
      expect(docs.value).toBe(0.75)
    )

  describe 'find all records for a given user', ->
    moodProvider = null
    beforeEach ->
      moodProvider = new MoodProvider
      moodProvider.save( [{value:0.75, user:'gregs@tcias.co.uk', project:'project name', dateAdded: new Date()},
                        {value:0.2, user:'gregs@tcias.co.uk', project:'project name', dateAdded: new Date()}
                        {value:0.3, user:'test@test.com', project:'project name', dateAdded: new Date()}], (error, moods)-> )

    it 'should return 2 records', ->
      moodProvider.findByUsername 'gregs@tcias.co.uk', (error, docs) ->
        expect( docs.length ).toBe 2

    it 'should return 1 record', ->
      moodProvider.findByUsername 'test@test.com', (error, docs) ->
        expect( docs.length ).toBe 1