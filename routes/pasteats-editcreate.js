//Renders past eats edit create page with the id in the 
//URL
exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('pasteats-editcreate', {'id':id});
}
