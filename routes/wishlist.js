var data = require('../data/data.json');
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

exports.view = function(req, res) {
  //res.render('wishlist', user);

	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		console.log(users[0]);
		res.render('wishlist', users[0]);
	}
}


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

	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		var wishlist = users[0].wishlist
		var entry = wishlist[findIndexByAttr(users[0].wishlist, 'g_places_id', req.query.gid)];
		if (entry == undefined) {
			wishlist.push(newentry);
			console.log(wishlist);
			console.log(newentry);
			console.log("\n\n\n\n\n");
			/*models.User
				.find({'google_id':req.user.google_id})*/

				users[0].update({'wishlist': wishlist})
					.exec(updateCallback);
		}

		function updateCallback(err){
			console.log("updateCallback called");
			if(err){console.log(err); res.send(500)}
			res.send(200);
		}
	}	

	/*var user = data[findIndexByAttr(data, 'google_id', req.user.google_id)];
	var entry = user.wishlist[findIndexByAttr(user.wishlist, 'g_places_id', req.query.gid)];
	if (entry == undefined) {
		user.wishlist.push(newentry);
	}
	res.send(200);*/
}

exports.remove = function(req, res) {
	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		console.log("user found");
		if(err){console.log(err); res.send(500)}
		var wishlist = users[0].wishlist;
		console.log(wishlist);
		console.log(req.query);
		console.log(wishlist[0].g_places_id === req.query.gid);
		var index = findIndexByAttr(wishlist, 'g_places_id', req.query.gid);
		console.log("index to be removed: " + index);
		if(index != -1){
			console.log(wishlist.length);
			wishlist.splice(index, 1);
			console.log(wishlist.length);

			users[0].update({'wishlist': wishlist}).exec(removeCallback);
		}
		function removeCallback(err){
			console.log("removeCallback");
			if(err){console.log(err); res.send(500)}
			res.send(200);
		}
	}
}

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


















