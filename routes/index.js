
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { project: 'What\s my mood??', title: 'What\s my mood??' })
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
  res.render('signIn', { project: 'What\s my mood??', title: 'Sign in process' })
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
