(function() {

  describe('basic user journey test', function() {
    var Browser, browser, jasmine, whenPageHasLoaded;
    Browser = require('zombie');
    jasmine = require('jasmine-node');
    Browser.debug = true;
    browser = new Browser();
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
    describe('capture my mood', function() {
      it('should visit how I feel page', function() {
        return whenPageHasLoaded('http://localhost:3000/how-are-you-feeling', function() {
          expect(browser.text('title')).toBe('How are you today?');
          return jasmine.asyncSpecDone();
        });
      });
      it('should have a slider element', function() {
        return whenPageHasLoaded('http://localhost:3000/how-are-you-feeling', function() {
          expect(browser.query('#slider'));
          return jasmine.asyncSpecDone();
        });
      });
      return it('should submit my mood', function() {
        return whenPageHasLoaded('http://localhost:3000/how-are-you-feeling', function() {
          var _this = this;
          return browser.pressButton('input#save-me', function(error, browser) {
            expect(browser.location.pathname).toBe('/save-my-mood');
            return jasmine.asyncSpecDone();
          });
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
