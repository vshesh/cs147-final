exports.view = function(req, res) {
  if(req.user) {
  var user = data[findIndexByAttr(data, 'google_id', req.user.google_id)];
  res.render('wishlist', user);
	} else res.render('login');

}

