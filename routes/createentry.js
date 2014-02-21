var data = require('../data/data.json');

exports.createEntry = function(req, res) {
	res.json(data);
}