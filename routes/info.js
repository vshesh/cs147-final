var models = require('../models');
var request = require('request');
var fs = require('fs');
var settings;

//Getting our API keys without putting them on github.
if(fs.existsSync('./settings.js')){
  settings = require('../settings.js');
}else{
  settings = {};
  settings.amazonID = process.env.S3Key;
  settings.amazonSecret = process.env.S3Secret;
  settings.callbackURL = "http://umami.herokuapp.com/auth/google/callback";
  settings.googleID = process.env.googleID;
  settings.googleSecret = process.env.googleSecret;
  settings.googleServer = process.env.googleServer;
}

//Takes the passed in ID and dynamically creates a webpage with it.
exports.viewById = function(req, res) {
  var ref = req.params.id;
  request("https://maps.googleapis.com/maps/api/place/details/json?reference="  + ref + "&sensor=false&key=" + settings.googleServer, callback);

  //make the entry yeah!
  function callback(error, result, body){
  	var theBody = JSON.parse(body);
  	var entry = {
  		"name" : theBody.result.name,
  		"rating" : theBody.result.rating,
  		"hours" : (theBody.result.opening_hours ? " " + theBody.result.opening_hours.periods[1].open.time + " - " + theBody.result.opening_hours.periods[1].close.time : ""),
  		"website": theBody.result.website, 
  		"reviews" : theBody.result.reviews,
  		"phone" : (theBody.result.international_phone_number ? theBody.result.international_phone_number.substr(3) : ""),
      "id" : theBody.result.id,
      "ref" : theBody.result.reference,
      "photos" : theBody.result.photos,
      "address" : theBody.result.formatted_address
  	};
  	res.render('info', entry);

  };
};
