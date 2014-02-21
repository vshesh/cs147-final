
/**
 * Module dependencies.
 * Vishesh, Ashley, Avi Final
 */

var express = require('express');
var passport = require('passport'), GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var partials = require('express-partials');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var request = require('request');
//var mongoose = require('mongoose');

//routes
var index = require('./routes/index');
var project = require('./routes/project');
var login = require('./routes/login');
var wishlist = require('./routes/wishlist');
var info = require('./routes/info');
var mapview = require('./routes/mapview');
var pasteats = require('./routes/pasteats');
var pasteats_editcreate = require('./routes/pasteats-editcreate');
var search = require('./routes/search');
var help = require('./routes/help');
var secrets = require('./secrets');

//Mongo Database
/*var local_database_name = 'cs147-final';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);*/

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.cookieParser());
app.use(express.session({secret: 'pink unicornians'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
		clientID: secrets.googleID,
		clientSecret: secrets.googleSecret,
		callbackURL: "https://umami.herokuapp.com/auth/google/callback"
	},
	function(accessToken, refreshToken, profile, done) {
			console.log(profile);
			process.nextTick(function(){
				console.log(profile);
				return done(null, profile);
			});
			/*login.findOrCreate({googleId: profile.id, name: profile.displayName}, function(err, user){
				console.log("created a user!");
				return done(err, user);
		});*/
	}
));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/login', login.view);
app.get('/wishlist', wishlist.view);
app.post('/wishlist', wishlist.loginUser);
app.get('/wishlist/add', wishlist.add);
app.get('/wishlist/remove', wishlist.remove);
app.get('/info/:id', info.viewById);
app.get('/mapview', mapview.view);
app.get('/pasteats', pasteats.view);
app.get('/pasteats/:id', pasteats.viewById);
app.get('/pasteats-editcreate/:id', pasteats_editcreate.viewById);
app.get('/search/results', search.viewResults);
app.get('/search', search.viewForm);
app.get('/search/results', search.viewResults);
app.get('/help', help.view);
app.get('/auth/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}));
app.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login'}),
		function(req, res){
			res.redirect('/wishlist');
		});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/pasteats/add/:id', pasteats.add);
app.post('/pasteats-editcreate/add', pasteats.add);

app.post('/pasteats/remove', pasteats.remove);
app.get('/wishlist/add/:id', wishlist.add);
app.get('/wishlist/find', wishlist.find);

// places autocomplete request endpoints. 
// NOTE: needs to not be visible to outside people (if someone found this url they could do lots of damage)
app.get('/places/autocomplete/:keywords', function(req, res) {
  request("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+req.params.keywords+"&location=37.76999,-122.44696&radius=500&sensor=false&key=AIzaSyCEkBg5mjDA-GYcn-AwsA6T8hNDgl_nLGo", 
        function(error, result, body) {res.json(result.body);});
})

app.get('/places/details/:id', function(req, res) {
  request("https://maps.googleapis.com/maps/api/place/details/json?reference=" + req.params.id + "&sensor=false&key=AIzaSyCEkBg5mjDA-GYcn-AwsA6T8hNDgl_nLGo", 
        function(error, result, body) {res.json(result.body);});
})

// routes for css/js in node_modules (libraries that we need)
app.get('/css/select2.css', function(req, res) {
  res.sendfile(path.join(__dirname, 'node_modules', 'select2', 'select2.css'));
});

app.get('/css/select2.png', function(req, res) {
  res.sendfile(path.join(__dirname, 'node_modules', 'select2', 'select2.png'));
});

app.get('/css/select2-bootstrap.css', function(req, res) {
  res.sendfile(path.join(__dirname, 'node_modules', 'select2', 'select2-bootstrap.css'));
});

app.get('/js/select2.js', function(req, res) {
  res.sendfile(path.join(__dirname, 'node_modules', 'select2', 'select2.js'));
});

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
