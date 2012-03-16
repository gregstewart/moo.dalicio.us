expect = require 'expect.js'
mongoose = require 'mongoose'
User = require '../app/model/UserMongoose'
UserProvider = require '../app/model/UserProviderMongoose'
Authenticate = require '../app/model/AuthenticateMongoose'

describe 'test authentication module', ->
  authenticate = null
  before (done) ->
    mongoose.connect 'mongodb://localhost/test', ->
      User.remove done
      user = new User (email: 'test@test.com', password: 'test')
      user.save ->
        done
    authenticate = new Authenticate(new UserProvider())

  it 'should have a test user', (done) ->
    User.findOne {'email':'test@test.com'}, (err, retrievedUser) ->
      retrievedUser.email.should.eql 'test@test.com'
      done()

  describe 'authentication', ->
    it 'should not authenticate a user', (done) ->
      authenticate.checkUser 'test@test.com', 'test2', (result) ->
        expect(result).to.be(false)
        done()

    it 'should authenticate a user', (done)->
      authenticate.checkUser 'test@test.com', 'test', (result) ->
        expect(result).to.be(true)
        done()