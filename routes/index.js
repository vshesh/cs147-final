exports.view = function(req, res) {
  if(req.user) res.render('wishlist');
  else res.render('login');
}

