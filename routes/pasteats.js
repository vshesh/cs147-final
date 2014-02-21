var models = require('../models.js');
var data = require('../data/data.json');

exports.view = function(req, res) {
  res.render('pasteats', data[0]);
}

exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('pasteats-entry');
}

exports.add = function(req, res) {
	models.User.find({google_id: req.user.google_id})
		.update({ })
		.exec(function(err) {
			if (err) {console.log(err); res.send(500);}
			else { res.send(200);}
		});
}


exports.remove= function(req, res) {
	
}