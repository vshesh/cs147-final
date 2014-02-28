exports.viewForm = function(req, res) {
  res.render('searchform');
}

exports.viewResults = function(req, res) {
  res.render('searchresults', {keyword: req.query.keyword});
}

exports.viewAlt = function(req, res) {
	res.render('searchformalt');
}