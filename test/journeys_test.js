(function() {
  var zombie;

  zombie = require("zombie");

  require("should");

  describe('journeys', function() {
    var browser;
    browser = null;
    beforeEach(function() {
      return browser = new zombie.Browser();
    });
    describe('test form submit', function() {
      return it('should hit google', function(done) {
        return browser.visit('https://www.google.co.uk/m', function() {
          var _this = this;
          return browser.fill('input', 'Zombie.js').pressButton('Search', function(err, browser) {
            browser.location._url.href.should.equal('https://www.google.co.uk/m?q=Zombie.js');
            return done();
          });
        });
      });
    });
    return describe("log in process", function() {
      it('should re-direct a user', function(done) {
        return browser.visit('http://localhost:3000/', function() {
          browser.location.pathname.should.equal('/not-logged-in');
          return done();
        });
      });
      return it('should fill in the right form fields', function(done) {
        return browser.visit("http://localhost:3000/not-logged-in/", function() {
          browser.fill("#sign-up-email", "test@test.com").fill("#sign-up-password", "test").fill("#verify-password", "test");
          browser.querySelector('#sign-up-email').value.should.equal('test@test.com');
          browser.querySelector('#sign-up-password').value.should.equal('test');
          browser.querySelector('#verify-password').value.should.equal('test');
          browser.querySelector('#sign-up-btn').type.should.equal('submit');
          return done();
        });
      });
    });
  });

}).call(this);
