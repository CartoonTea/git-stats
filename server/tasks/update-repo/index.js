/**
 * Updates a repo's issues & labels
 * 1. Creates a repo if it does not exist
 * 2. Retrieves and adds all the labels
 */
module.exports = function (params, callback) {

  console.log(JSON.stringify(params).red);

  // find or create repository
  models.Repository.findOrCreate({
    where: {
      owner: params.owner,
      name: params.name
    }
  }).spread(function (repo, created) {

    // get labels
    client.repo(params.owner + '/' + params.name).labels(function (err, data, headers) {
      if (err) { return callback(err); }
      async.each(data, function (labelData, done) {

        // find or create label
        models.Label.findOrCreate({
          where: {
            url: labelData.url
          }
        }).spread(function (label, created) {
          label.set('name', labelData.name);
          label.set('color', labelData.color);
          label.setRepository(repo);
          label.save().then(function (label) {
            done();
          }).catch(function (err) {
            done(err);
          });
        }).catch(function (err) {
          callback(err);
        });
      }, function (err) {
        if (err) { return callback(err); }
        callback();
      });
    });
  }).catch(function (err) {
    callback(err);
  });
};