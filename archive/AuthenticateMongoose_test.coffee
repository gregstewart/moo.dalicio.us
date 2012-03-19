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
    it 'should not authenticate a user',->
      authenticate.checkUser 'test@test.com', 'test2', (result) ->
        expect(result).to.be(false)

    it 'should authenticate a user',->
      authenticate.checkUser 'test@test.com', 'test', (result) ->
        expect(result).to.be(true)

    it 'should authenticate a user too', ->
      authenticate.checkUser 'test@test.com', 'test', (result) ->
        expect(result).to.be(true)


  describe 'validate email address', ->
    it 'should return true for a valid email address', ->
      expect(authenticate.isValidEmail('test@test.com')).to.be(true)

    it 'should return false if email is invalid', ->
      expect(authenticate.isValidEmail('testtest.com')).to.be(false)

  describe 'check for existing user', ->

    it 'should return true because the user already exists', () ->
      authenticate.checkUserExists 'test@test.com', (result) ->
        expect( result ).to.be(true)

    it 'should return false because the user does not exist', () ->
      authenticate.checkUserExists 'test2@test.com', (result) ->
        expect( result ).to.be(false)

    describe 'no user exists', ->
      beforeEach (done) ->
        User.remove(done)

      it 'should return false', () ->
        authenticate.checkUserExists 'test@test.com', (result) ->
          expect( result ).to.be(false)
