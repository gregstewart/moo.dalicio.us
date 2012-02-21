Mood = require('../../app/Mood').Mood

describe 'mood capture', ->
  testMoodObject = null
  beforeEach -> testMoodObject = new Mood 0.5

  it 'should have a mood value attribute', ->
    expect(testMoodObject.submittedValue).toBeDefined()

  it 'should have a mood value', ->
    expect(testMoodObject.submittedValue).not.toBeNull()

  it 'should have a date value', ->
    expect(testMoodObject.createDate).not.toBeNull()