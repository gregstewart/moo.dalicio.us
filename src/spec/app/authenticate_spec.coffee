Authenticate = require('../../app/Authenticate').Authenticate

describe 'test authentication module', ->
  testAuthenticateObject = null
  beforeEach -> testAuthenticateObject = new Authenticate

  it 'should authenticate user', ->
    expect( testAuthenticateObject.checkUser('gregs@tcias.co.uk', 'test') ).toBeTruthy()

  it 'should not authenticate an invalid user', ->
    expect( testAuthenticateObject.checkUser('gregs@tcias.co.uk', 'test2') ).toBeFalsy()


  describe 'validate email address', ->

    it 'should validate an email address', ->
      expect(testAuthenticateObject.isValidEmail('gregs@tcias.co.uk')).toBeTruthy()

    it 'should return false if email is invalid', ->
      expect(testAuthenticateObject.isValidEmail('gregstcias.co.uk')).toBeFalsy()
