module.exports = function (params, callback) {
  var org = params.org;
  var repo = params.repo;
  var name = params.name;
 
  // find the repo
  models.Repository.findOne({
    where: {
      owner: org,
      name: repo
    }
  }).then(function (repo) {
    if (!repo) { return callback('repo not found'); }

    // create the label
    models.LabelGroup.create({
      RepositoryId: repo.id,
      name: name
    }).then(function (group) {
      callback(null, group);
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};