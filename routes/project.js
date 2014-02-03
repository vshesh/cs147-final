exports.viewProject = function(req, res) {
  var name = req.params.name;
  res.render('project', {
    'jumbo-name': name, 
    'jumbo-description': 'one-sentence description goes here',
    'jumbo-id': 'project-jumbo'
  });
};