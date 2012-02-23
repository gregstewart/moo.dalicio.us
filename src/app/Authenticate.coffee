class Authenticate
  constructor: ->

  checkUser: (email, password) ->
    if email == 'gregs@tcias.co.uk' && password == 'test'
      return true
    else
      return false

  isValidEmail: (email) ->
    pattern = /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}\b/
    result = pattern.exec(email);
    if result == null then return false

    return true

exports.Authenticate = Authenticate