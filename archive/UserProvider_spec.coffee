UserProvider = require('../../app/UserProvider-memory').UserProvider

describe 'UserProvider tests', ->
  it 'should initialised UserProvider to memory', ->
    userProvider = new UserProvider
    expect(userProvider.dummyData.length).toBe(0)

  it 'should save 2 records', ->
    userProvider = new UserProvider
    userProvider.save( [{user:'gregs@tcias.co.uk', password:'test'},
                        {user:'greg.stewart@gmail.com', password:'test'}], (error, users)-> )
    userProvider.findAll((error, docs) ->
      expect(docs.length).toBe(2)
    )

  describe 'retrieve results', ->
    userProvider = null

    beforeEach ->
      userProvider = new UserProvider
      userProvider.save( [{user:'gregs@tcias.co.uk', password:'test'},
                        {user:'greg.stewart@gmail.com', password:'test'}], (error, users)-> )

    it 'should return one result from memory using findAll', ->
      userProvider.findAll((error, docs) ->
        expect(docs.length).toBe(2)
      )

    it 'should return one result with a user from memory using findById', ->
      userProvider.findById(1, (error, docs) ->
        expect(docs.user).toBe('gregs@tcias.co.uk')
      )

    it 'should return a user by his username', ->
      userProvider.findByUsername('gregs@tcias.co.uk', (error, docs) ->
        expect(docs.user).toBe('gregs@tcias.co.uk')
      )