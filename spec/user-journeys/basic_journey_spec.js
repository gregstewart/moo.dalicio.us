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
      it('should redirect to log in if not logged in', function() {});
      describe('login process', function() {
        return it('should visit the signin page', function() {
          return whenPageHasLoaded('http://localhost:3000/sign-in', function() {
            expect(browser.text('title')).toBe('Sign in process');
            return jasmine.asyncSpecDone();
          });
        });
      });
      return describe('signup process', function() {
        return it('should visit the signup page', function() {
          return whenPageHasLoaded('http://localhost:3000/sign-up', function() {
            expect(browser.text('title')).toBe('Sign up process');
            return jasmine.asyncSpecDone();
          });
        });
      });
    });
    describe('visit the homepage', function() {
      it('should visit homepage', function() {
        return whenPageHasLoaded('http://localhost:3000/', function() {
          expect(browser.text('title')).toBe('What\s my mood??');
          return jasmine.asyncSpecDone();
        });
      });
      it('should have a link to take me to capture my mood', function() {
        return whenPageHasLoaded('http://localhost:3000/', function() {
          expect(browser.text('a:last')).toBe('How are you feeling today?');
          return jasmine.asyncSpecDone();
        });
      });
      return it('clicking on the link should take you to the slider page', function() {
        return whenPageHasLoaded('http://localhost:3000/', function() {
          var _this = this;
          return browser.clickLink('a:last', function(error, browser) {
            expect(browser.location.pathname).toBe('/how-are-you-feeling');
            return jasmine.asyncSpecDone();
          });
        });
      });
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
