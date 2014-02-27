//Returns int
var findIndexByAttr = function(array, attr, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].hasOwnProperty(attr) && array[i][attr] === value) {
            return i;
        }
    }
    return undefined;
}

exports.view = function(req, res) {
  if(req.user) {
  var user = data[findIndexByAttr(data, 'google_id', req.user.google_id)];
  res.render('wishlist', user);
	} else res.render('login');

}

