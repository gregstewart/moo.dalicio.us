mongoose = require 'mongoose'
Mood = require '../app/model/MoodMongoose'

describe 'Mood', ->
  before (done) ->
    mongoose.connect 'mongodb://localhost/test', ->
      Mood.remove done

  it 'should save a mood submission', (done) ->
    mood = new Mood (value: 0.5, user: 'test@test.com', project: 'your project')
    mood.save ->
      Mood.findOne _id: mood._id, (err, retrievedMood) ->
        retrievedMood.value.toString().should.eql '0.5'
        retrievedMood.user.should.eql 'test@test.com'
        retrievedMood.project.should.eql 'your project'
        done()

  it 'should not save a mood submission with a value less than 0', (done) ->
    mood = new Mood (value: -1, user: 'test@test.com', project: 'your project')
    mood.save (error) ->
      message = error.errors.value.message
      message.should.eql 'Validator "min" failed for path value'
      done()

  it 'should not save a mood submission with a value greater than 1', (done) ->
    mood = new Mood (value: 2, user: 'test@test.com', project: 'your project')
    mood.save (error) ->
      message = error.errors.value.message
      message.should.eql 'Validator "max" failed for path value'
      done()