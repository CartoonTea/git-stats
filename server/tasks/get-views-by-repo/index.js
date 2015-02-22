module.exports = function (params, callback) {
  var repo = params.repo;
  var org = params.org;
  models.Repository.findOne({
    where: {
      owner: org,
      name: repo
    }
  }).then(function (repo) {
    if (!repo) { return callback('repo not found'); }
    models.View.findAll({
      where: {
        RepositoryId: repo.id
      }
    }).then(function (views) {
      callback(null, views);
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};