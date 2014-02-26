var models = require('../models.js');
var data = require('../data/data.json');
var fs = require('fs');

//Returns data value
var findByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return array[i];
        }
    }
    return undefined;
}

//Returns int
var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return undefined;
}

//Allows for easy access to month names in the Date prototype.
Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

Date.prototype.getMonthName = function() {
	    return this.monthNames[this.getMonth()];
};


exports.view = function(req, res) {
	var user = findByAttr(data, 'google_id', req.user.google_id);
  res.render('pasteats', user);
}



exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('pasteats-entry');
}



exports.add = function(req, res) {

	console.log(req.body);
	console.log(req.files);
	fs.readFile(req.files.photo.path, function(err, photoData){
		var oldImageName = req.files.photo.name;
		if(!oldImageName){
			console.log("Error reading the name");
			res.end();
		}

		var nowTime = Date.now();
		var newPath = __dirname + "/data/images/" + nowTime + ".jpg";
		fs.writeFile(newPath, photoData, function(err){
			if(err)console.log(err);
			console.log(newPath);
			var time = new Date();
			var newEntry = {
				'created_timestamp' : Date.now(),
				'formatted_date': time.getMonthName() + " " + time.getDate() + ", " + time.getFullYear(),
				'title' : req.body.title,
				'summary': req.body.summary,
				'image' : "/data/images/" + nowTime + ".jpg",
				'caption': req.body.caption,
				'gid': req.body.gid
			};

			var user = findByAttr(data, 'google_id', req.user.google_id);
			user.pasteats.unshift(newEntry);
			res.redirect('/pasteats');
		}) 
	});

	

	//res.redirect('/pasteats');
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
