
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'What\s my mood??' })
};

/*
 * Get smiley page
 */
exports.how= function(req, res){
  res.render('how', { title: 'How are you today?' })
};