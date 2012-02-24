User = require('../../app/User').User
Mood = require('../../app/Mood').Mood

describe 'test user object', ->
  testUser = null
  defaultEmailAddress = 'test@test.com'

  beforeEach -> testUser = new User defaultEmailAddress

  it 'should create a default user object', ->
    expect( testUser.getUserName() ).toEqual(defaultEmailAddress)


  it 'should return moods', ->
    expect( testUser.moods ).toBeDefined()

  it 'should add a mood to the user', ->
    testMood = new Mood 0.5
    testUser.setMood(testMood)
    expect( testUser.getMoods().length ).toBe(1)