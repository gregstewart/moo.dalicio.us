(function() {
  var Utils;

  Utils = require('../app/model/Utils');

  describe('Utils tests', function() {
    var utils;
    utils = null;
    beforeEach(function() {
      return utils = new Utils();
    });
    return describe('should validate email address', function() {
      it('should return true', function() {
        return utils.isValidEmail('test@test.com').should.eql(true);
      });
      return it('should return false', function() {
        return utils.isValidEmail('testtest.com').should.eql(false);
      });
    });
  });

}).call(this);
