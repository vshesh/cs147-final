var data = require('../data/data.json');
var models = require('../models');
var request = require('request');

exports.viewById = function(req, res) {
  var ref = req.params.id;
  request("https://maps.googleapis.com/maps/api/place/details/json?reference="  + ref + "&sensor=false&key=AIzaSyCEkBg5mjDA-GYcn-AwsA6T8hNDgl_nLGo", callback);

  function callback(error, result, body){
  	var theBody = JSON.parse(body);
  	var entry = {
  		"name" : theBody.result.name,
  		"rating" : theBody.result.rating,
  		"hours" : (theBody.result.opening_hours ? " " + theBody.result.opening_hours.periods[1].open.time + " - " + theBody.result.opening_hours.periods[1].close.time : ""),
  		"website": theBody.result.website, 
  		"reviews" : theBody.result.reviews,
  		"phone" : theBody.result.international_phone_number.substr(3),
      "id" : theBody.result.id,
      "ref" : theBody.result.reference,
      "photos" : theBody.result.photos,
  	};
  	res.render('info', entry);

  };
  //res.render('info', data[0].wishlist[id-1]);
  //This renders a page with the id
  //Continue to edit the default info page
  //Edit app.js to match everything else (so that you can do info/:id)
};
