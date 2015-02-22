/**
 * Updates a repo's issues & labels
 * 1. Creates a repo if it does not exist
 * 2. Retrieves and adds all the labels
 */
module.exports = function (params, callback) {

  var repoClient = client.repo(params.owner + '/' + params.name);

  // find or create repository
  models.Repository.findOrCreate({
    where: {
      owner: params.owner,
      name: params.name
    }
  }).spread(function (repo, created) {

    // get labels
    repoClient.labels(function (err, data, headers) {
      if (err) { return callback(err); }
      console.log('here'.green);
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
          done(err);
        });
      }, function (err) {
        if (err) { return callback(err); }

        // get issues
        repoClient.issues(function (err, data, headers) {
          if (err) { return callback(err); }
          async.each(data, function (issueData, done) {

            // find or create issue
            models.Issue.findOrCreate({
              where: {
                url: issueData.url
              }
            }).spread(function (issue, created) {
              issue.set('state', issueData.state);
              issue.set('title', issueData.title);
              issue.set('user', issueData.user.login);
              issue.set('created_at', issueData.created_at);
              issue.set('closed_at', issueData.closed_at);
              issue.set('updated_at', issueData.updated_at);
              issue.setRepository(repo);
              issue.save().then(function (issue) {
                async.each(issueData.labels, function (labelData, done) {
                  models.Label.findOne({
                    where: {
                      url: labelData.url
                    }
                  }).then(function (label) {
                    issue.addLabel(label);
                    issue.save().then(function (issue) {
                      done();
                    }).catch(function (err) {
                      done(err);
                    });
                  }).catch(function (err) {
                    done(err);
                  });
                }, function (err) {
                  if (err) { return done(err); }
                  done();
                });
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
      });
    });
  }).catch(function (err) {
    callback(err);
  });
};