Utils = require '../app/model/Utils'

describe 'Utils tests', ->
  utils = null
  beforeEach ->
    utils = new Utils()

  describe 'should validate email address', ->

    it 'should return true', ->
      utils.isValidEmail('test@test.com').should.eql true

    it 'should return false', ->
      utils.isValidEmail('testtest.com').should.eql false