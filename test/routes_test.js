(function() {
  var routes;

  routes = require("../routes/index");

  require("should");

  describe("routes", function() {
    return describe("not logged in", function() {
      return it("should display not logged in", function() {
        var req, res;
        req = null;
        res = {
          render: function(view, vars) {
            view.should.equal("login");
            return vars.title.should.equal("Not logged in");
          }
        };
        return routes.notLoggedIn(req, res);
      });
    });
  });

}).call(this);
