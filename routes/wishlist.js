var data = require('../data/data.json');

exports.view = function(req, res) {
  req.session.lastPage = '/login';
  res.render("wishlist", data.users[0]);
}


exports.loginUser = function(req, res) {
	console.log(req.body.authToken);
	data.users[0].access_token = req.body.authToken;
	console.log(data.users[0]);
	res.end('true');
}