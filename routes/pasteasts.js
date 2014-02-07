exports.view = function(req, res) {
  res.render('login');
}

exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('login');
}