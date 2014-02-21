var models = require('../models.js');
var data = require('../data/data.json');

exports.view = function(req, res) {
  res.render('pasteats', data[0]);
}

var findByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return array[i];
        }
    }
    return undefined;
}

exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('pasteats-entry');
}

exports.add = function(req, res) {
	console.log("adding new past eat");
	console.log(req);

	var newEntry = {
		'created_timestamp' : Date.now(),
		'title' : req.body.title,
		'summary': req.body.summary,
		'image' : req.body.image,
		'caption': req.body.caption
	};

	var user = findByAttr(data, 'google_id', req.user.id);
	user.pasteats.push(newEntry);

	res.redirect('/pasteats');
}


exports.remove= function(req, res) {
	console.log("allo!");
	console.log(req);
	var user = data[findByAttr(data, 'google_id', req.user.id)];
	console.log(user);
	var index = findByAttr(user.pasteats, 'created_timestamp', req.body.timestamp);
	if (index != -1) {
		console.log('found the index alright');
		user.pasteats.splice(index, 1);
		res.send(200);
	}
	res.send(201);
}
