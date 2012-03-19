(function() {
  var UserProvider;

  UserProvider = require('../../app/UserProvider-memory').UserProvider;

  describe('UserProvider tests', function() {
    it('should initialised UserProvider to memory', function() {
      var userProvider;
      userProvider = new UserProvider;
      return expect(userProvider.dummyData.length).toBe(0);
    });
    it('should save 2 records', function() {
      var userProvider;
      userProvider = new UserProvider;
      userProvider.save([
        {
          user: 'gregs@tcias.co.uk',
          password: 'test'
        }, {
          user: 'greg.stewart@gmail.com',
          password: 'test'
        }
      ], function(error, users) {});
      return userProvider.findAll(function(error, docs) {
        return expect(docs.length).toBe(2);
      });
    });
    return describe('retrieve results', function() {
      var userProvider;
      userProvider = null;
      beforeEach(function() {
        userProvider = new UserProvider;
        return userProvider.save([
          {
            user: 'gregs@tcias.co.uk',
            password: 'test'
          }, {
            user: 'greg.stewart@gmail.com',
            password: 'test'
          }
        ], function(error, users) {});
      });
      it('should return one result from memory using findAll', function() {
        return userProvider.findAll(function(error, docs) {
          return expect(docs.length).toBe(2);
        });
      });
      it('should return one result with a user from memory using findById', function() {
        return userProvider.findById(1, function(error, docs) {
          return expect(docs.user).toBe('gregs@tcias.co.uk');
        });
      });
      return it('should return a user by his username', function() {
        return userProvider.findByUsername('gregs@tcias.co.uk', function(error, docs) {
          return expect(docs.user).toBe('gregs@tcias.co.uk');
        });
      });
    });
  });

}).call(this);
