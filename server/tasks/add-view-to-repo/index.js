module.exports = function (params, callback) {
  var formula = params.formula;
  var repo = params.repo;
  var org = params.org;

  models.Repository.findOne({
    where: {
      owner: org,
      name: repo
    }
  }).then(function (repo) {
    if (!repo) { return callback('repo not found'); }
    models.View.create({
      formula: formula,
      RepositoryId: repo.id
    }).then(function (formula) {
      callback(null, formula);
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};