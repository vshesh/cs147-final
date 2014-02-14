var data = require('../data/data.json');

exports.view = function(req, res) {
  var name = req.params.name;
  res.render('login');
};