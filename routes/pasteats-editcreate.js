exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('pasteats-editcreate');
}
