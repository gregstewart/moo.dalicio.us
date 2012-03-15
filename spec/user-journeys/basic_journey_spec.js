(function() {

  describe('basic user journey test', function() {
    var Browser, browser, jasmine, whenPageHasLoaded;
    Browser = require('zombie');
    jasmine = require('jasmine-node');
    browser = new Browser();
    describe('visit the spec-runner page', function() {
      return it('should not return any errors', function() {
        return whenPageHasLoaded('http://localhost:3000/javascripts/spec/spec-runner.html', function() {
          expect(browser.response[0]).toBe(200);
          expect(browser.queryAll('.runner.passed')).toBeTruthy();
          return jasmine.asyncSpecDone();
        });
      });
    });
    describe('visit log in/sign up page', function() {
      it('visit the not logged in page', function() {
        return whenPageHasLoaded('http://localhost:3000/not-logged-in', function() {
          expect(browser.text('title')).toBe('Not logged in');
          return jasmine.asyncSpecDone();
        });
      });
      it('should redirect to log in if not logged in', function() {
        return whenPageHasLoaded('http://localhost:3000/', function() {
          expect(browser.location.pathname).toBe('/not-logged-in');
          return jasmine.asyncSpecDone();
        });
      });
      describe('login process', function() {
        return it('should visit the signin page', function() {});
      });
      describe('signup process', function() {});
      return describe('signout process', function() {});
    });
    describe('visit the homepage', function() {
      it('should visit homepage', function() {});
      it('should have a link to take me to capture my mood', function() {});
      return it('clicking on the link should take you to the slider page', function() {});
    });
    describe('creating a project', function() {
      return it('should visit the create project page', function() {
        return whenPageHasLoaded('http://localhost:3000/create-project', function() {
          expect(browser.text('title')).toBe('Create project');
          return jasmine.asyncSpecDone();
        });
      });
    });
    describe('capture my mood', function() {
      return it('should have a slider element', function() {
        return whenPageHasLoaded('http://localhost:3000/how-are-you-feeling', function() {
          expect(browser.query('#slider'));
          return jasmine.asyncSpecDone();
        });
      });
    });
    return whenPageHasLoaded = function(url, callback) {
      browser.visit(url, function(error, browser) {
        return callback.call();
      });
      return jasmine.asyncSpecWait();
    };
  });

}).call(this);
