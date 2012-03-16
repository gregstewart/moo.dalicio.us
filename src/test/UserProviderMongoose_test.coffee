mongoose = require 'mongoose'
User = require '../app/model/UserMongoose'
UserProvider = require '../app/model/UserProviderMongoose'

describe 'User', ->
  before (done) ->
    mongoose.connect 'mongodb://localhost/test', ->
      User.remove done
      user = new User (email: 'test@test.com', password: 'test')
      user.save ->
        done

  it 'should have a test user', (done) ->
    User.findOne {'email':'test@test.com'}, (err, retrievedUser) ->
      retrievedUser.email.should.eql 'test@test.com'
      done()

  describe 'test user provider object', ->
    userProvider = null
    email = 'test@test.com'
    beforeEach ->
      userProvider = new UserProvider()

    it 'should find a user by username', (done) ->
      userProvider.findByUsername email, (err, user) ->
        user.email.should.eql email
        done()