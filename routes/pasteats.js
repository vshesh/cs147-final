var models = require('../models.js');
var data = require('../data/data.json');
var fs = require('fs');
var AWS = require('aws-sdk');
var settings;
if(fs.existsSync('./settings.js')){
	settings = require('../settings.js');
}else{
	settings = {};
	settings.amazonID = process.env.S3Key;
	settings.amazonSecret = process.env.S3Secret;
}

AWS.config.update({
	accessKeyId: settings.amazonID,
	secretAccessKey: settings.amazonSecret,
	region: 'us-west-2',
});


//Returns int
var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

//Allows for easy access to month names in the Date prototype.
Date.prototype.monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun",
    "Jul", "Aug", "Sept",
    "Oct", "Nov", "Dec"
];

Date.prototype.getMonthName = function() {
	    return this.monthNames[this.getMonth()];
};


exports.view = function(req, res) {
	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		console.log(users[0]);
		res.render('pasteats', users[0]);
	}
}



exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('pasteats-entry');
}



exports.add = function(req, res) {

	var time = new Date();
 	var newEntry = {
		'created_timestamp' : Date.now(),
		'id': Date.now() + '_' + req.user.google_id,
		'formatted_date': time.getMonthName() + " " + time.getDate() + ", " + time.getFullYear(),
		'title' : req.body.title,
		'summary': req.body.summary,
		'caption': req.body.caption,
		'gid': req.body.gid
	};

	var s3 = new AWS.S3();
 	fs.readFile(req.files.photo.path, function(err, photoData){
 		var oldImageName = req.files.photo.name;
 		if(oldImageName){
 			var nowTime = Date.now();
 			var fileName = nowTime + "_" + req.user.google_id + ".jpg";

 			s3.client.putObject({
 				Bucket: 'umamiappimages',
 				Key: fileName,
 				Body: photoData,
 				ContentType: 'image/jpeg',
 				ACL: 'public-read'
 			}, function (err, response){
 				if(err)console.log(err);
	 			newEntry['image'] = "http://s3-us-west-2.amazonaws.com/umamiappimages/" + fileName;
	 			updateUser(newEntry);
	 			/*user.pasteats.unshift(newEntry);
	 			res.redirect('/pasteats');*/
 			});

 			/*fs.writeFile(newPath, photoData, function(err){
	 			if(err)console.log(err);
	 			console.log(newPath);
 			}); */	
 			
 		}else{
 			newEntry['image'] = "";
 			updateUser(newEntry)
 			/*user.pasteats.unshift(newEntry);
 			res.redirect('/pasteats');*/
 		}	

	});

	function updateUser(entry){
		models.User
			.find({'google_id':req.user.google_id})
			.sort()
			.exec(userCallback);

		function userCallback (err, users){
			if(err){console.log(err); res.send(500)}
			var pasteats = users[0].pasteats;
			pasteats.unshift(entry);
			users[0].update({'pasteats': pasteats}).exec(addCallback);
		}

		function addCallback(err){
			if(err){console.log(err); res.send(500)}
			res.redirect('/pasteats');
		}
	}

	

	//res.redirect('/pasteats');
}

exports.remove= function(req, res) {
	
	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		console.log("user found");
		if(err){console.log(err); res.send(500)}
		var pasteats = users[0].pasteats;
		console.log(req.body);
		console.log(pasteats);
		console.log(parseInt(req.body.id));
		var index = findIndexByAttr(pasteats, 'id', req.body.id);
		console.log("index to be removed: " + index);
		if(index != -1){
			pasteats.splice(index, 1);

			users[0].update({'pasteats': pasteats}).exec(removeCallback);
		}
		function removeCallback(err){
			console.log("removeCallback");
			if(err){console.log(err); res.send(500)}
			res.send(200);
		}
	}
}
