mongoose = require 'mongoose'
User = require '../app/model/UserMongoose'

describe 'User', ->
  before (done) ->
    mongoose.connect 'mongodb://localhost/test', ->
      User.remove done

  it 'should create a new user ', (done) ->
    user = new User (email: 'test@test.com', password: 'test')
    user.save ->
      User.findOne _id: user._id, (err, retrievedUser) ->
        retrievedUser.email.should.eql 'test@test.com'
        hashed = retrievedUser.encryptPassword('test')
        retrievedUser.hashed_password.should.eql hashed
        done()

  it 'should not create the same user twice', (done) ->
    user = new User (email: 'test@test.com', password: 'test')
    user.save (error) ->
      error.err.should.eql 'E11000 duplicate key error index: test.users.$email_1  dup key: { : "test@test.com" }'
      done()

  it 'should authenticate a user', (done) ->
    User.findOne {'email': 'test@test.com'}, (error, retrievedUser) ->
      retrievedUser.should.not.eql null
      retrievedUser.authenticate('test').should.eql true
      done()