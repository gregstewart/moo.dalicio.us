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
