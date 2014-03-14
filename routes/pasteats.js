var models = require('../models.js');
var fs = require('fs');
var AWS = require('aws-sdk');

//Keeping our secrets secret.
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


//Uses the google id to render that particular users past eats.
exports.view = function(req, res) {
	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		res.render('pasteats', users[0]);
	}
}



//Views each one individually (not implemented)
exports.viewById = function(req, res) {
  var id = req.params.id;
  	models.User
		.find({'google_id':id})
		.sort()
		.exec(userCallback);

		function userCallback(err, users){
			if(err){console.log(err); res.send(500)}
			if(users[0].pasteats.public){
				res.render('pasteats', users[0]);
			}else{
				res.render('login');
			}
		}
}


//Adds a new past eats entry!
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

	//Uploads a photo if they attach one
	//Otherwise just submits it.
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
 			});
 			
 		}else{
 			newEntry['image'] = "";
 			updateUser(newEntry)
 		}	

	});

 	//After creating the entry, associates it with the User
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

		//Once it's all done, it reloads the past eats page.
		function addCallback(err){
			if(err){console.log(err); res.send(500)}
			res.redirect('/pasteats');
		}
	}

}

//Removes the entry from past eats user data.
exports.remove= function(req, res) {
	
	models.User
		.find({'google_id':req.user.google_id})
		.sort()
		.exec(userCallback);

	function userCallback(err, users){
		if(err){console.log(err); res.send(500)}
		var pasteats = users[0].pasteats;
		var index = findIndexByAttr(pasteats, 'id', req.body.id);
		if(index != -1){
			pasteats.splice(index, 1);

			//upadates the entry
			users[0].update({'pasteats': pasteats}).exec(removeCallback);
		}
		function removeCallback(err){
			if(err){console.log(err); res.send(500)}
			res.send(200);
		}
	}
}
