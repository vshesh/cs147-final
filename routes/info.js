var data = require('../data/data.json');

exports.viewById = function(req, res) {
  var id = req.params.id;
  res.render('info', data.users[0].wishlist[id-1]);
  //This renders a page with the id
  //Continue to edit the default info page
  //Edit app.js to match everything else (so that you can do info/:id)
}