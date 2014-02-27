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

	var time = new Date();
 	var newEntry = {
		'created_timestamp' : Date.now(),
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
 				var user = findByAttr(data, 'google_id', req.user.google_id);
	 			newEntry['image'] = fileName;
	 			user.pasteats.unshift(newEntry);
	 			res.redirect('/pasteats');

 			});

 			/*fs.writeFile(newPath, photoData, function(err){
	 			if(err)console.log(err);
	 			console.log(newPath);
	 			
 			}); */	
 			
 		}else{
 			var user = findByAttr(data, 'google_id', req.user.google_id);
	 			newEntry['image'] = "";
	 			user.pasteats.unshift(newEntry);
	 			res.redirect('/pasteats');
 		}	
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
