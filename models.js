var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
	//define fields
	"name": String,
	"google_id": String,
	"wishlist": [{"id":String, "g_places_id":String, "g_places_ref":String, "created_timestamp": Date}],
	"pasteats": [{"place_name": String, "created_timestamp": Date, "formatted_date": String, "title":String, "summary":String, "image": String, "caption": String, "id": String}]
});

exports.User = Mongoose.model('User', UserSchema);
