var data = require('../data/data.json');
var models = require('../models');
var request = require('request');


exports.view = function(req, res) {
  req.session.lastPage = '/login';
  res.render("wishlist", data[0]);
	/*models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);*/

	/*function userCallback(err, user){
		console.log(user[0].wishlist);
		console.log(data[0].wishlist);
		if(err){console.log(err), res.send(500)};
		var wishlist = [];
		var count = 0;
		for(var i = 0; i < user[0].wishlist.length; i++){
			request("https://maps.googleapis.com/maps/api/place/details/json?reference="  + user[0].wishlist[i].g_places_id + "&sensor=false&key=AIzaSyCEkBg5mjDA-GYcn-AwsA6T8hNDgl_nLGo", callback);
			

			function callback(error, result, body){
				console.log("\n\n\n\n\n\n");
				count += 1;
				console.log(count);
				var theBody = JSON.parse(body);
				var entry = {
					"name": theBody.result.name,
					"rating":theBody.result.rating,
				}
				wishlist.push(entry);
			}
		}

		res.render('wishlist', data[0]/*user[0].wishlist);
	}*/

}


exports.loginUser = function(req, res) {
	console.log(req.body.authToken);
	data.users[0].access_token = req.body.authToken;
	console.log(data.users[0]);
	res.end('true');
}