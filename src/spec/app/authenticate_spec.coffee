Authenticate = require('../../app/Authenticate').Authenticate
UserProvider = require('../../app/UserProvider-memory').UserProvider

describe 'test authentication module', ->
  testAuthenticateObject = null
  beforeEach ->
    userProvider = new UserProvider
    userProvider.save([{user: 'test@test.com', password: 'test' }], (error, users) -> )
    testAuthenticateObject = new Authenticate userProvider

  it 'should authenticate user', ->
    expect( testAuthenticateObject.checkUser('test@test.com', 'test') ).toBeTruthy()

  it 'should not authenticate an invalid user', ->
    expect( testAuthenticateObject.checkUser('test@test.com', 'test2') ).toBeFalsy()


  describe 'validate email address', ->

    it 'should validate an email address', ->
      expect(testAuthenticateObject.isValidEmail('test@test.com')).toBeTruthy()

    it 'should return false if email is invalid', ->
      expect(testAuthenticateObject.isValidEmail('testtest.com')).toBeFalsy()

  describe 'check for existing user', ->

    it 'should return true because user already exists', ->
      expect( testAuthenticateObject.checkUserExists('test@test.com') ).toBeTruthy()

    it 'should return false because user does not exists', ->
      expect( testAuthenticateObject.checkUserExists('test2@test.com') ).toBeFalsy()

    it 'should return false because no user exists', ->
      anotherUserProvider = new UserProvider
      anotherAuthenticateObject = new Authenticate anotherUserProvider
      expect( anotherUserProvider.dummyData.length).toBe(0)
      expect( anotherAuthenticateObject.checkUserExists('test2@test.com') ).toBeFalsy()