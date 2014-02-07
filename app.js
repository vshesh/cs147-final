
/**
 * Module dependencies.
 * Vishesh, Ashley, Avi Final
 */

var express = require('express');
var partials = require('express-partials');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var project = require('./routes/project');
var login = require('./routes/login');
var wishlist = require('./routes/wishlist');
var info = require('./routes/info');
var mapview = require('./routes/mapview');
var pasteats = require('/routes/pasteats');
var search = require('/routes/search');
var help = require('/routes/help');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/project/:name', project.viewProject);
app.get('/login', login.view);
app.get('/wishlist', wishlist.view);
app.get('/info/:id', info.viewById);
app.get('/mapview', mapview.view);
app.get('/pasteats', pasteats.view);
app.get('/pasteats/:id', pasteats.viewById);
app.get('/search', search.viewForm);
app.get('/search/results', search.viewResults);
app.get('/help', help.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});































