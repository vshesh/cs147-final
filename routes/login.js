var data = require('../data/data.json');
var models = require('../models');

exports.view = function(req, res) {
  var name = req.params.name;
  res.render('login');
};

exports.findOrCreate = function(req, res){
		models.User
		.find({'google_id':req.googleId})
		.sort()
		.exec(userCallback);

		function userCallback(err, user){
			console.log(user);
			if(user.length){
				 res(false, user[0])
			}else{
				var newUser = models.User({
					"name": req.name,
					"google_id":req.googleId,
					"wishlist": null,
					"pasteats": null,
				});

				newUser.save(function(err){
					if(err){console.log(err); res(err, false)}
					res(false, this);
				});
			}
		}
}