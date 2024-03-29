
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose');

var app = module.exports = express.createServer();

// Configuration
var port = process.env.PORT || 3000;

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'wooo secret key' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('test', function(){
  mongoose.connect('mongodb://localhost/test');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('development', function(){
  mongoose.connect('mongodb://localhost/dev');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
    mongoose.connect(process.env.MONGOLAB_URI);
    app.use(express.errorHandler());
});

app.dynamicHelpers({
    session: function (req, res) {
        return req.session;
    },
    flashMessages: function(req, res) {
        // http://dailyjs.com/2011/01/03/node-tutorial-8/
        var html = '';
        ['error', 'info'].forEach(function(type) {
          var messages = req.flash(type);
          if (messages.length > 0) {
            html += '<div class="row">';
            html += '<div class="span12 alert alert-' + type + '">';
            html += '<a class="close" data-dismiss="alert">x</a>';
            html += '<p>' + messages +'</p>';
            html += '</div>';
            html += '</div>';
          }
        });
        return html;
    }
});

// Routes
app.get('/', routes.index);
app.get('/not-logged-in', routes.notLoggedIn);

app.get('/get/moods', routes.getMoods);

app.get('/how-are-you-feeling', routes.how);
app.get('/create-project', routes.createProject);

app.post('/sign-in', routes.signIn);
app.post('/sign-up', routes.signUp);
app.get('/sign-out', routes.signOut);
app.post('/save-my-mood', routes.saveMood);

app.listen(port);