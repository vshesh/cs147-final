exports.view = function(req, res) {
  res.render('pasteats');
}

exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('pasteats-entry');
}


