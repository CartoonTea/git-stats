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
      _.forEach(data, function (org) {
        client.org(org.login).repos(function (err, data, headers) {
          if (err) { return callback(err); }
          repos = repos.concat(data);
          callback(null, repos);
        });
      });
    });
  });
};