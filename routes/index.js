var Authenticate = require('../app/Authenticate').Authenticate;
var UserProvider = require('../app/UserProvider-memory').UserProvider;
var MoodProvider = require('../app/MoodProvider-memory').MoodProvider;

var userProvider =  new UserProvider();
var moodProvider = new MoodProvider();
var auth = new Authenticate(userProvider);

/*
 * GET home page.
 */
exports.index = function(req, res){
  if (typeof req.session.user === 'undefined') {
    res.redirect('/not-logged-in');
  } else {
    res.render('index', { project: 'Moo.dalicio.us', title: 'Moo.dalicio.us??' })
  }
};

/*
 * GET login page.
 */
exports.notLoggedIn = function(req, res){
  res.render('login', { project: 'Moo.dalicio.us', title: 'Not logged in' })
};

/*
 * POST sign in page.
 */
exports.signIn = function(req, res){
    if ( auth.checkUser(req.body.email, req.body.password) ) {
        auth.createUserSession(req.session, req.body.email);
        res.redirect('/');
    } else {
        req.flash('error', 'Authentication failed, please check your username and password.');
        res.redirect('back');
    }
};

/*
 * GET sign out page.
 */
exports.signOut = function(req, res){
    auth.destroySession(req.session);
    res.clearCookie('auth');
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/');
};

/*
 * POST sign up page.
 */
exports.signUp = function(req, res){
    var email = req.body.email,
        password = req.body['password'],
        verifyPassword = req.body['verify-password'];

    if ( auth.isValidEmail(email) && (password === verifyPassword) ) {
        if ( auth.checkUserExists(email) === false || auth.checkUserExists(email) === undefined ) {
            userProvider.save( [ {user:email, password:password} ], function(errors, users) {
                if (errors === null) {
                    auth.createUserSession(req.session, email);

                    req.flash('info', 'Congratulations, you are now ready to post your mood!');
                    res.redirect('/');
                } else {
                    req.flash('error', 'Sign up failed. Unable to save user details.');
                    res.redirect('back');
                }
            });
        } else {
            req.flash('error', 'Sign up failed. Sorry that username is already in use.');
            res.redirect('back');
        }
    } else {
        req.flash('error', 'Sign up failed. Please make your sure you provided a valid email address and that your passwords matched.');
        res.redirect('back');
    }
};

/*
 * GET smiley page
 */
exports.how = function(req, res) {
  if (typeof req.session.user === 'undefined') {
    res.redirect('/not-logged-in');
  } else {
    res.render('how', { project: 'Moo.dalicio.us', title: 'How are you today?' })
  }
};

/*
 * POST save mood
 */
exports.saveMood = function(req, res) {
  moodProvider.save([{value:req.body.value, user:req.session.user, project:req.body.project, date: new Date()}], function(errors, moods) {
    if (errors === null) {
        req.flash('info', 'Mood saved');
        res.redirect('/')
    } else {
        req.flash('error', 'Failed to save your mood.');
        res.redirect('back');
    }
  });
};

/*
 * GET create project page
 */
exports.createProject = function(req, res) {
  res.render('createProject', { project: 'Moo.dalicio.us', title: 'Create project' })
};
