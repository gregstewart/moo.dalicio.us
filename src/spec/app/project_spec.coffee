Project = require('../../app/Project').Project
User = require('../../app/User').User

describe 'test project object', ->
  testProject = null

  beforeEach -> testProject = new Project('test name')

  it 'should create a default project object', ->
    expect( testProject.getName() ).toEqual('test name')

  it 'should create a date if none supplied', ->
    expect( testProject.getDate() ).not.toBeNull()

  it 'should set start and end date to null if not supplied', ->
    expect( testProject.getStartDate() ).toBeNull()
    expect( testProject.getEndDate() ).toBeNull()

  describe 'set start and end date', ->

    beforeEach -> testProject = new Project('name', new Date, new Date, new Date)

    it 'should set the start date if specified', ->
      expect( testProject.getStartDate() ).not.toBeNull()

    it 'should set the end date if specified', ->
      expect( testProject.getEndDate() ).not.toBeNull()


  describe 'user section', ->
    beforeEach -> testProject = new Project('test name')

    it 'should have a users reference', ->
      expect( testProject.getUsers() ).toBeDefined()

    it 'should add a user', ->
      testUser = new User 'test@test.com'
      testProject.addUser(testUser)
      expect( testProject.getUsers().length ).toBe(1)