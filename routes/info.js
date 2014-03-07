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
    var hours = "";
    if(theBody.result.opening_hours){
      var today = new Date();
      var startNum = parseInt(theBody.result.opening_hours.periods[today.getDay()].open.time);
      var endNum = parseInt(theBody.result.opening_hours.periods[today.getDay()].close.time);
      console.log(today.getDay());
      var startMorn, endMorn;
      startNum < 1200 ? startMorn = 'A' : startMorn = 'P';
      endNum < 1200 ? endMorn = 'A': endMorn = 'P'; 
      startNum = startNum % 1200;
      endNum = endNum % 1200;
      var start = startNum.toString();
      var end = endNum.toString();
      start = startNum < 1000 ? start.substring(0, 1) + ":" + start.substring(1): start.substring(0, 2) + ":" + start.substring(2);
      end = endNum < 1000 ? end.substring(0, 1) + ":" + end.substring(1): end.substring(0, 2) + ":" + end.substring(2);
      start += startMorn;
      end += endMorn;
      hours = start + " - " + end;
    }

  	var entry = {
  		"name" : theBody.result.name,
  		"rating" : theBody.result.rating,
  		"hours" : hours,//(theBody.result.opening_hours ? " " + theBody.result.opening_hours.periods[1].open.time + " - " + theBody.result.opening_hours.periods[1].close.time : ""),
      "opennow": (theBody.result.opening_hours.opennow ? "<span style='color: green'>open</span>" : "<span style='color: #cc0052'>closed</span>"),
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
