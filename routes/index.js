var Utils = require('../app/model/Utils');
var User = require('../app/model/UserMongoose');
var Mood = require('../app/model/MoodMongoose');

var utils = new Utils();

/*
 * GET home page.
 */
exports.index = function(req, res){
  if (typeof req.session.user === 'undefined') {
    res.redirect('/not-logged-in');
  } else {
    res.render('index', { project: 'Moo.dalicio.us', title: 'Moo.dalicio.us!'});
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
    var email = req.body.email,
        password = req.body.password;

    User.findOne( {'email':email}, function(error, user) {
        if (user && user.authenticate(password)) {
            utils.createUserSession(req.session, email);
            res.redirect('/');
        } else {
            req.flash('error', 'Authentication failed, please check your username and password.');
            res.redirect('back');
        }
    });
};

/*
 * GET sign out page.
 */
exports.signOut = function(req, res){
    utils.destroySession(req.session);
    res.clearCookie('auth');
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    res.redirect('/');
};

/*
 * POST sign up page.
 */
exports.signUp = function(req, res, next){
    var email = req.body.email,
        password = req.body['password'],
        verifyPassword = req.body['verify-password'];

    if ( utils.isValidEmail(email) && (password === verifyPassword) ) {
        var user = new User({'email' : email, 'password' : password});

        user.save(function(errors) {
            if (errors === null) {
                utils.createUserSession(req.session, email);

                req.flash('info', 'Congratulations, you are now ready to post your mood!');
                res.redirect('/');
            } else {
                var errorMessage = 'Sign up failed. Unable to save user details.';
                if (errors.code === 11000) {
                    errorMessage = 'Sign up failed. Username is already in use';
                }

                req.flash('error', errorMessage);
                res.redirect('back');
            }
        });

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
    if (typeof req.session.user !== 'undefined') {
      var submittedMood = req.body.mood;
      var mood = new Mood({value: submittedMood.value, user: req.session.user, project: submittedMood.project});
      mood.save(function(errors, moods) {
        if (errors === null) {
            req.flash('info', 'Mood saved');
            res.redirect('/')
        } else {
            req.flash('error', 'Failed to save your mood.');
            res.redirect('back');
        }
      });
    } else {
        res.redirect('/not-logged-in');
    }
};

/*
 * GET all moods
 */
exports.getMoods = function(req, res) {
  if (typeof req.session.user !== 'undefined') {
    Mood.find( {'user':req.session.user}, function(error, moods) {
        if (moods !== null) {
            var data = [];
            for (var i = 0; i < moods.length; i++) {
                data.push( {y: moods[i].date, a: moods[i].value*100} );
            }
            res.json(data);
        }
    });

  } else {
     res.send(403);
  }
};

/*
 * GET create project page
 */
exports.createProject = function(req, res) {
  res.render('createProject', { project: 'Moo.dalicio.us', title: 'Create project' })
};
