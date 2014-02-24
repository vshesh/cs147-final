var models = require('../models.js');
var data = require('../data/data.json');

var findByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return array[i];
        }
    }
    return undefined;
}

var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return undefined;
}

exports.view = function(req, res) {
	var user = findByAttr(data, 'google_id', req.user.google_id);
	console.log("this is for the view");
	console.log(user);
  res.render('pasteats', user);
}



exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('pasteats-entry');
}

exports.add = function(req, res) {

	var newEntry = {
		'created_timestamp' : Date.now(),
		'title' : req.body.title,
		'summary': req.body.summary,
		'image' : req.body.image,
		'caption': req.body.caption
	};

	var user = findByAttr(data, 'google_id', req.user.google_id);
	user.pasteats.push(newEntry);

	res.redirect('/pasteats');
}


exports.remove= function(req, res) {
	var user = findByAttr(data, 'google_id', req.user.google_id);
	var index = findIndexByAttr(user.pasteats, 'created_timestamp', req.body.timestamp);
	if (index != -1) {
		user.pasteats.splice(index, 1);
		res.send(200);
	}
	res.send(201);
}
