var data = require('../data/data.json');
var models = require('../models');
var request = require('request');

var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

exports.view = function(req, res) {
  req.session.lastPage = '/login';
  console.log("found -1? " + findIndexByAttr(data, 'google_id', req.user.google_id));
  var user = data[findIndexByAttr(data, 'google_id', req.user.google_id)];
  //res.render('wishlist', user);

	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		res.render('wishlist', users[0]);
	}	

}


exports.add = function(req, res) {
	var newentry = {
		"g_places_ref" : req.query.gref,
		"g_places_id" : req.query.gid,
		"created_timestamp" : Date.now()
	};

	var user = data[findIndexByAttr(data, 'google_id', req.user.google_id)];
	var entry = user.wishlist[findIndexByAttr(user.wishlist, 'g_places_id', req.query.gid)];
	if (entry == undefined) {
		user.wishlist.push(newentry);
	}
	res.send(200);
}

exports.remove = function(req, res) {
	var user = data[findIndexByAttr(data, 'google_id', req.user.google_id)];
	var index = findIndexByAttr(user.wishlist, 'g_places_id', req.query.gid);
	if (index != -1) {
		user.wishlist.splice(index, 1);
		res.send(200);
	}
	res.send(201);
}

exports.find = function(req, res) {
	var user = data[findIndexByAttr(data, 'google_id', req.user.google_id)];
	var index = findIndexByAttr(user.wishlist, 'g_places_id', req.query.gid);
	if (index == -1) {
		res.json({found: false});
	} else {
		res.json({found: true});
	}
}


















