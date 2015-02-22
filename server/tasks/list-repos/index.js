/**
 * Lists the repos that a user has access to
 */
module.exports = function (params, callback) {
  var repos = [];
  client.me().repos(function (err, data, headers) {
    if (err) { return callback(err); }
    repos = repos.concat(data);
    client.me().orgs(function (err, data, headers) {
      if (err) { return callback(err); }
      async.each(data, function (org, done) {
        client.org(org.login).repos(function (err, data, headers) {
          if (err) { return callback(err); }
          repos = repos.concat(data);
          done();
        });
      }, function (err) {
        if (err) { return callback(err); }
        callback(null, repos);
      });
    });
  });
};