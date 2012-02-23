
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , auth = require('./app/auth/')

var app = module.exports = express.createServer();

// Configuration

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

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.dynamicHelpers({
    session: function (req, res) {
        return req.session;
    }
});

// Routes
app.get('/', routes.index);
app.get('/not-logged-in', routes.notLoggedIn);
app.get('/how-are-you-feeling', routes.how);
app.get('/create-project', routes.createProject);

app.post('/sign-in', routes.signIn);
app.post('/sign-up', routes.signUp);
app.post('/save-my-mood', routes.saveMood);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


