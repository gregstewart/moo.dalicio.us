authenticateUser = function(email, password) {
    console.log('[authenticate] Starting auth for ' + email + ' with password ' + password);

    if (email === 'gregs@tcias.co.uk' && password === 'test') {
        return true;
    } else {
        return false;
    }
};

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
    if (authenticateUser(req.body.email, req.body.password)) {
        req.session.regenerate(function(){
            req.session.cookie.maxAge = 100 * 24 * 60 * 60 * 1000; //Force longer cookie age
            req.session.cookie.httpOnly = false;
            req.session.user = 'user';

            res.redirect('/');
        });
    } else {
        req.session.error = 'Authentication failed, please check your username and password.';
        res.redirect('back');
    }

  //res.render('signIn', { project: 'What\s my mood??', title: 'Sign in process' })
};

/*
 * POST sign up page.
 */
exports.signUp = function(req, res){
  res.render('signUp', { project: 'What\s my mood??', title: 'Sign up process' })
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
