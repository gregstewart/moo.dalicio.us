(function() {

  describe('basic user journey test', function() {
    var Browser, browser, jasmine, whenPageHasLoaded;
    Browser = require('zombie');
    jasmine = require('jasmine-node');
    browser = new Browser();
    it('should visit homepage', function() {
      return whenPageHasLoaded(function() {
        expect(browser.text('title')).toBe('Express');
        return jasmine.asyncSpecDone();
      });
    });
    return whenPageHasLoaded = function(callback) {
      browser.visit('http://localhost:3000/', function(error, browser) {
        return callback.call();
      });
      return jasmine.asyncSpecWait();
    };
  });

}).call(this);
