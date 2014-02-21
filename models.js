var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
	//define fields
	"name": String,
	"google_id":String,
	"wishlist": [{"id":String, "g_places_id":String, "created_timestamp": Date}],
	"pasteats": [{"g_places_id": String, "created_timestamp": Date, "last_modified_timestamp": Date, "entry_time": Date, "body":String, "photo_entries":[{"image": String, "caption": String}]}],

});

exports.User = Mongoose.model('User', UserSchema);