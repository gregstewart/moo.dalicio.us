(function() {
  var Project;

  Project = (function() {

    function Project(name, date, startDate, endDate) {
      this.name = name;
      this.date = date;
      this.startDate = startDate;
      this.endDate = endDate;
      this.date = typeof this.date === 'undefined' ? new Date : this.date;
      this.startDate = typeof this.startDate === 'undefined' ? null : this.startDate;
      this.endDate = typeof this.endDate === 'undefined' ? null : this.endDate;
      this.users = [];
    }

    Project.prototype.getName = function() {
      return this.name;
    };

    Project.prototype.getDate = function() {
      return this.date;
    };

    Project.prototype.getStartDate = function() {
      return this.startDate;
    };

    Project.prototype.getEndDate = function() {
      return this.endDate;
    };

    Project.prototype.addUser = function(user) {
      return this.users.push(user);
    };

    Project.prototype.getUsers = function() {
      return this.users;
    };

    return Project;

  })();

  exports.Project = Project;

}).call(this);
