var Authenticate = require('../app/Authenticate').Authenticate;
var auth = new Authenticate();

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
  res.render('login', { project: 'What\s my mood??', title: 'Not looged in' })
};

/*
 * POST sign in page.
 */
exports.signIn = function(req, res){
    if ( auth.checkUser(req.body.email, req.body.password) ) {
        req.session.regenerate(function(){
            req.session.cookie.maxAge = 100 * 24 * 60 * 60 * 1000; //Force longer cookie age
            req.session.cookie.httpOnly = false;
            req.session.user = req.body.email;

            res.redirect('/');
        });
    } else {
        req.session.error = 'Authentication failed, please check your username and password.';
        res.redirect('back');
    }
};

/*
 * POST sign up page.
 */
exports.signUp = function(req, res){
    var email = req.body.email,
        password = req.body['password'],
        verifyPassword = req.body['verify-password'];
    if ( auth.isValidEmail(email) && (password === verifyPassword) ) {
    req.session.regenerate(function(){
        req.session.cookie.maxAge = 100 * 24 * 60 * 60 * 1000; //Force longer cookie age
        req.session.cookie.httpOnly = false;
        req.session.user = req.body.email;
        req.session.signUpMessage = 'Congratulations, you are now ready to post your mood!';
        res.redirect('/');
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
  console.log(req.body);
  res.render('saveMood', { project: 'What\s my mood??', title: 'Mood saved' })
};

/*
 * GET create project page
 */
exports.createProject= function(req, res){
  res.render('createProject', { project: 'What\s my mood??', title: 'Create project' })
};
