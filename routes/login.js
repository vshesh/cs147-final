var models = require('../models');

//Returns int
var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}


//Instant render of log in.
exports.view = function(req, res) {
  res.render('login');
};

exports.findOrCreate = function(req, res){
		

		models.User
  			.find({"google_id": req.googleId})
  			.sort()
 				.exec(userCallback);

 		function userCallback(err, users){
 			if (users.length){
 				res(false, users[0]);
 			}
 			else{
 				var userObject = {
					'name': req.name,
					'google_id': req.googleId,
					'wishlist': [],
					'pasteats': []
				}
				newUser = models.User(userObject);
				newUser.save(function(err){
					if(err){console.log(err); res.send(500)};
					res(false, userObject);
				})

 			}
 		}

}