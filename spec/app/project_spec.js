(function() {
  var Project, User;

  Project = require('../../app/Project').Project;

  User = require('../../app/User').User;

  describe('test project object', function() {
    var testProject;
    testProject = null;
    beforeEach(function() {
      return testProject = new Project('test name');
    });
    it('should create a default project object', function() {
      return expect(testProject.getName()).toEqual('test name');
    });
    it('should create a date if none supplied', function() {
      return expect(testProject.getDate()).not.toBeNull();
    });
    it('should set start and end date to null if not supplied', function() {
      expect(testProject.getStartDate()).toBeNull();
      return expect(testProject.getEndDate()).toBeNull();
    });
    describe('set start and end date', function() {
      beforeEach(function() {
        return testProject = new Project('name', new Date, new Date, new Date);
      });
      it('should set the start date if specified', function() {
        return expect(testProject.getStartDate()).not.toBeNull();
      });
      return it('should set the end date if specified', function() {
        return expect(testProject.getEndDate()).not.toBeNull();
      });
    });
    return describe('user section', function() {
      beforeEach(function() {
        return testProject = new Project('test name');
      });
      it('should have a users reference', function() {
        return expect(testProject.getUsers()).toBeDefined();
      });
      return it('should add a user', function() {
        var testUser;
        testUser = new User('test@test.com');
        testProject.addUser(testUser);
        return expect(testProject.getUsers().length).toBe(1);
      });
    });
  });

}).call(this);
