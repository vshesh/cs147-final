var data = require('../data/data.json');
var models = require('../models');
var request = require('request');

var findByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

exports.view = function(req, res) {
  req.session.lastPage = '/login';
  var user = data[findByAttr(data, 'google_id', req.user.google_id)];
  res.render('wishlist', user);

  /*data.filter(function(user){
  	console.log(user.google_id);
  	console.log(req.user.google_id);
  	if(user.google_id === req.user.google_id){
  	  		res.render("wishlist", user);
  	  		return true;

  	 }

  	else return false;

  });*/
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


exports.add = function(req, res) {
//	console.log(req.user);
	// FIX THE NAMING
	var newentry = {
		"g_places_ref" : req.query.gref,
		"g_places_id" : req.query.gid,
		"created_timestamp" : Date.now()
	};

	console.log(req);
	var user = data[findByAttr(data, 'google_id', req.user.google_id)];
	console.log(user);
	console.log(user.wishlist.length);
	var entry = user.wishlist[findByAttr(user.wishlist, 'g_places_id', req.query.gid)];
	if (entry == undefined) {
		user.wishlist.push(newentry);
		console.log(user.wishlist[user.wishlist.length-1]);
	}
	res.send(200);
}

exports.remove = function(req, res) {
	var user = data[findByAttr(data, 'google_id', req.user.id)];
	console.log(user.wishlist.length);
	console.log(req.query);
	console.log(user.wishlist[0]);
	var index = findByAttr(user.wishlist, 'g_places_id', req.query.gid);
	if (index != -1) {
		console.log('found the index alright');
		user.wishlist.splice(index, 1);
		res.send(200);
	}
	res.send(201);
}

exports.find = function(req, res) {
  console.log('ajax: finding id');
	var user = data[findByAttr(data, 'google_id', req.user.google_id)];
	var index = findByAttr(user.wishlist, 'g_places_ref', req.query.gref);
  console.log(index);
	if (index == -1) {
		console.log('not in wishlist');
		res.json({found: false});
	} else {
		console.log('in wishlist');
		res.json({found: true});
	}
}


















