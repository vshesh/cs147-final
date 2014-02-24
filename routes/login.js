var data = require('../data/data.json');
var models = require('../models');

var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}


exports.view = function(req, res) {
  var name = req.params.name;
  res.render('login');
};

exports.findOrCreate = function(req, res){
		

		var user = data[findIndexByAttr(data, 'google_id', req.googleId)];
		if(user == undefined){
			var newUser = {
				'name': req.name,
				'google_id': req.googleId,
				'access_token': null,
				'wishlist': [],
				'pasteats': []
			}
			data.push(newUser);
		}

		res(false, data[data.length-1]);

		/*models.User
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
		}*/
}