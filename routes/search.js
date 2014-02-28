//renders the form
exports.viewForm = function(req, res) {
  res.render('searchform');
}

//Renders results
exports.viewResults = function(req, res) {
  res.render('searchresults', {keyword: req.query.keyword, minprice: req.query.minprice, maxprice: req.query.maxprice});
}

//renders alternate search page.
exports.viewAlt = function(req, res) {
	res.render('searchformalt');
}