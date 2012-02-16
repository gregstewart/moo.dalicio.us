
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { project: 'What\s my mood??', title: 'What\s my mood??' })
};

/*
 * Get smiley page
 */
exports.how= function(req, res){
  res.render('how', { project: 'What\s my mood??', title: 'How are you today?' })
};