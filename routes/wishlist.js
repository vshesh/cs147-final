var models = require('../models');
var request = require('request');

var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

//Renders wishlist based on current signed in user.
exports.view = function(req, res) {
	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		res.render('wishlist', users[0]);
	}
}


//Adds an entry to the wishlist
exports.add = function(req, res) {
	var newentry = {
		"g_places_ref" : req.query.gref,
		"g_places_id" : req.query.gid,
		"created_timestamp" : Date.now()
	};

	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

		//Called to add to the user
	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		var wishlist = users[0].wishlist
		var entry = wishlist[findIndexByAttr(wishlist, 'g_places_id', req.query.gid)];
		if (entry == undefined) {
			wishlist.push(newentry);

				users[0].update({'wishlist': wishlist})
					.exec(updateCallback);
		}

		function updateCallback(err){
			res.send(200);
		}
	}	
}

//Removes wishlist entry from user data.
exports.remove = function(req, res) {
	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		var wishlist = users[0].wishlist;
		var index = findIndexByAttr(wishlist, 'g_places_id', req.query.gid);
		if(index != -1){
			wishlist.splice(index, 1);

			users[0].update({'wishlist': wishlist}).exec(removeCallback);
		}
		function removeCallback(err){
			if(err){console.log(err); res.send(500)}
			res.send(200);
		}
	}
}

//Finds the wishlist entry, returns a boolean.
exports.find = function(req, res) {
	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);
	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		
		var index = findIndexByAttr(users[0].wishlist, 'g_places_id', req.query.gid);
		if (index == -1) {
			res.json({found: false});
		} else {
			res.json({found: true});
		}
	}	
	
}
