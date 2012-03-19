class Authenticate
  constructor: (@userProvider) ->

  checkUser: (email, password) ->
    @userProvider.findByUsername email, (error, user) ->
      if email == user.user && password == user.password then return true

      return false

  checkUserExists: (email) ->
    @userProvider.findByUsername email, (error, user) ->
      if typeof user.user == 'object' || user == null then return false

      return true

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

exports.Authenticate = Authenticate