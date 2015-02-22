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

    // find labelgroups
    models.LabelGroup.findAll({
      where: {
        RepositoryId: repo.id
      }
    }).then(function (labelGroups) {
      callback(null, labelGroups);
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};