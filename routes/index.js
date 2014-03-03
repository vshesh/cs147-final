var models = require('../models');

//returns int
var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

//Logging someone in!
exports.view = function(req, res) {
  //renders a user if they are in the cookie
  if(req.user) {
  models.User
  			.find({"google_id": req.user.google_id})
  			.sort()
 				.exec(renderUser);
 				console.log(req.user)

	  function renderUser(err, users){
	  	if(err){console.log(err); res.send(500)}
	  	res.render('wishlist', users[0]);
	  }
	} else res.render('login'); //logs them in if they aren't already.

}

