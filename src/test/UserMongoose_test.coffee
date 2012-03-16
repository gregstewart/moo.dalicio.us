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
        retrievedUser.password.should.eql 'test'
        done()
