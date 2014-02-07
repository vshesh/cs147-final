exports.viewById = function(req, res) {
  id = req.params.id;
  res.render('placeinfo');
}