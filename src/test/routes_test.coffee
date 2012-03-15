routes = require "../routes/index"
require "should"

describe "routes", ->
  describe "not logged in", ->
    it "should display not logged in", ->
      req = null
      res = 
        render: (view, vars) ->
          view.should.equal "login"
          vars.title.should.equal "Not logged in"
      routes.notLoggedIn(req, res)



