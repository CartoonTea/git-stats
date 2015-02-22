module.exports = function (params, callback) {
  var org = params.org;
  var repo = params.repo;
  models.Repository.findOne({
    where: {
      owner: org,
      name: repo
    }
  }).then(function (repo) {
    models.Label.findAll({
      where: {
        RepositoryId: repo.id
      }
    }).then(function (labels) {
      callback(null, labels);
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};