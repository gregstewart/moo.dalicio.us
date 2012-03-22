moment = require("moment")
Utils = require("../app/model/Utils")
User = require("../app/model/UserMongoose")
Mood = require("../app/model/MoodMongoose")
utils = new Utils()
exports.index = (req, res) ->
  if typeof req.session.user is "undefined"
    res.redirect "/not-logged-in"
  else
    res.render "index",
      project: "Moo.dalicio.us"
      title: "Moo.dalicio.us!"

exports.notLoggedIn = (req, res) ->
  res.render "login",
    project: "Moo.dalicio.us"
    title: "Not logged in"

exports.signIn = (req, res) ->
  email = req.body.email
  password = req.body.password
  User.findOne
    email: email
  , (error, user) ->
    if user and user.authenticate(password)
      utils.createUserSession req.session, email
      res.redirect "/"
    else
      req.flash "error", "Authentication failed, please check your username and password."
      res.redirect "back"

exports.signOut = (req, res) ->
  utils.destroySession req.session
  res.clearCookie "auth"
  res.header "Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  res.redirect "/"

exports.signUp = (req, res, next) ->
  email = req.body.email
  password = req.body["password"]
  verifyPassword = req.body["verify-password"]
  if utils.isValidEmail(email) and (password is verifyPassword)
    user = new User(
      email: email
      password: password
    )
    user.save (errors) ->
      if errors is null
        utils.createUserSession req.session, email
        req.flash "info", "Congratulations, you are now ready to post your mood!"
        res.redirect "/"
      else
        errorMessage = "Sign up failed. Unable to save user details."
        errorMessage = "Sign up failed. Username is already in use"  if errors.code is 11000
        req.flash "error", errorMessage
        res.redirect "back"
  else
    req.flash "error", "Sign up failed. Please make your sure you provided a valid email address and that your passwords matched."
    res.redirect "back"

exports.how = (req, res) ->
  if typeof req.session.user is "undefined"
    res.redirect "/not-logged-in"
  else
    res.render "how",
      project: "Moo.dalicio.us"
      title: "How are you today?"

exports.saveMood = (req, res) ->
  if typeof req.session.user isnt "undefined"
    submittedMood = req.body.mood
    mood = new Mood(
      value: submittedMood.value
      user: req.session.user
      project: submittedMood.project
    )
    mood.save (errors, moods) ->
      if errors is null
        req.flash "info", "Mood saved"
        res.redirect "/"
      else
        req.flash "error", "Failed to save your mood."
        res.redirect "back"
  else
    res.redirect "/not-logged-in"

exports.getMoods = (req, res) ->
  if typeof req.session.user isnt "undefined"
    Mood.find
      user: req.session.user
    , (error, moods) ->
      if moods isnt null
        data = []
        i = 0

        while i < moods.length
          data.push
            y: moment(moods[i].date).format("DD/MM/YYYY HH:mm")
            a: moods[i].value * 100
          i++
        res.json data
  else
    res.send 403

exports.createProject = (req, res) ->
  res.render "createProject",
    project: "Moo.dalicio.us"
    title: "Create project"
