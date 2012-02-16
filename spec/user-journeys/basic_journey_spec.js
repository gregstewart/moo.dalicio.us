(function() {

  describe('basic user journey test', function() {
    var Browser, browser, jasmine, whenPageHasLoaded;
    Browser = require('zombie');
    jasmine = require('jasmine-node');
    browser = new Browser();
    describe('visit the homepage', function() {
      it('should visit homepage', function() {
        return whenPageHasLoaded('http://localhost:3000/', function() {
          expect(browser.text('title')).toBe('What\s my mood??');
          return jasmine.asyncSpecDone();
        });
      });
      return it('should have a link to take me to capture my mood', function() {
        return whenPageHasLoaded('http://localhost:3000/', function() {
          expect(browser.text('a:last')).toBe('How are you feeling?');
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
          expect(browser.query("#slider"));
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
