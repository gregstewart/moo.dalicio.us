var Authenticate = require('../app/Authenticate').Authenticate;
var Mood = require('../app/Mood').Mood;
var UserProvider = require('../app/UserProvider-memory').UserProvider;

var userProvider =  new UserProvider();
var auth = new Authenticate(userProvider);

/*
 * GET home page.
 */
exports.index = function(req, res){
  if (typeof req.session.user === 'undefined') {
    res.redirect('/not-logged-in');
  } else {
    res.render('index', { project: 'What\s my mood??', title: 'What\s my mood??' })
  }
};

/*
 * GET login page.
 */
exports.notLoggedIn = function(req, res){
  res.render('login', { project: 'What\s my mood??', title: 'Not logged in' })
};

/*
 * POST sign in page.
 */
exports.signIn = function(req, res){
    if ( auth.checkUser(req.body.email, req.body.password) ) {
        auth.createUserSession(req.session, req.body.email);
        res.redirect('/');
    } else {
        req.session.error = 'Authentication failed, please check your username and password.';
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
        console.log(UserProvider);
        userProvider.save([{user:email, password:password}], function(errors, users) {
            if (errors === null) {
                auth.createUserSession(req.session, email);

                req.session.signUpMessage = 'Congratulations, you are now ready to post your mood!';
                res.redirect('/');
            } else {
                req.session.error = 'Sign up failed. Unable to save user details.';
                res.redirect('back');
            }
        });
    } else {
        req.session.error = 'Sign up failed. Please make your sure you provided a valid email address and that your passwords matched.';
        res.redirect('back');
    }
};

/*
 * GET smiley page
 */
exports.how= function(req, res){
  res.render('how', { project: 'What\s my mood??', title: 'How are you today?' })
};

/*
 * POST save mood
 */
exports.saveMood= function(req, res){
  var mood = new Mood(req.session.user, req.body.value, 1)
  res.render('saveMood', { project: 'What\s my mood??', title: 'Mood saved' })
};

/*
 * GET create project page
 */
exports.createProject= function(req, res){
  res.render('createProject', { project: 'What\s my mood??', title: 'Create project' })
};
