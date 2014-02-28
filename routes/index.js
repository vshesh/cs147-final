//Returns int
var data = require('../data/data.json');
var models = require('../models');

var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

exports.view = function(req, res) {
  if(req.user) {
  //var user = data[findIndexByAttr(data, 'google_id', req.user.google_id)];
  models.User
  			.find({"google_id": req.user.google_id})
  			.sort()
 				.exec(renderUser);
 				console.log(req.user)

	  function renderUser(err, users){
	  	if(err){console.log(err); res.send(500)}
	  	res.render('wishlist', users[0]);
	  }
	} else res.render('login');

}

