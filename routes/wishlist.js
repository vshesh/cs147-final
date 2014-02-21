var data = require('../data/data.json');

exports.view = function(req, res) {
  req.session.lastPage = '/login';
  res.render("wishlist", data[0]);
  console.log("this is the req")
  console.log(req.user.google_id);
  console.log("yes");
}


exports.loginUser = function(req, res) {
	console.log(req.body.authToken);
	data.users[0].access_token = req.body.authToken;
	console.log(data.users[0]);
	res.end('true');
}