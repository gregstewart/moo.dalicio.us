class Authenticate
  constructor: (@userProvider) ->

  checkUser: (email, password, callback) ->
    @userProvider.findByUsername email, (error, user) ->
      callback email == user.email && password == user.password

  checkUserExists: (email, callback) ->
    @userProvider.findByUsername email, (error, user) ->
      callback user != null

  isValidEmail: (email) ->
    pattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/
    result = pattern.exec(email);
    if result == null then return false

    return true

  createUserSession: (session, email) ->
    session.regenerate( ->
        session.cookie.maxAge = 100 * 24 * 60 * 60 * 1000; #Force longer cookie age
        session.cookie.httpOnly = false;
        session.user = email;
    )

  destroySession: (session) ->
    session.auth = null
    session.destroy ->

module.exports = Authenticate