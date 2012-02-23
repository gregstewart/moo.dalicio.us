(function() {

  describe('basic user journey test', function() {
    var Browser, browser, jasmine, whenPageHasLoaded;
    Browser = require('zombie');
    jasmine = require('jasmine-node');
    browser = new Browser();
    describe('visit log in/sign up page', function() {
      it('visit the not logged in page', function() {
        return whenPageHasLoaded('http://localhost:3000/not-logged-in', function() {
          expect(browser.text('title')).toBe('Not looged in');
          return jasmine.asyncSpecDone();
        });
      });
      it('should redirect to log in if not logged in', function() {
        return whenPageHasLoaded('http://localhost:3000/', function() {
          expect(browser.location.pathname).toBe('/not-logged-in');
          return jasmine.asyncSpecDone();
        });
      });
      describe('login process', function() {});
      return describe('signup process', function() {});
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
      it('should visit how I feel page', function() {
        return whenPageHasLoaded('http://localhost:3000/how-are-you-feeling', function() {
          expect(browser.text('title')).toBe('How are you today?');
          return jasmine.asyncSpecDone();
        });
      });
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
