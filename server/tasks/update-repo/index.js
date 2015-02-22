/**
 * Updates a repo's issues & labels
 */
module.exports = function (params, callback) {
  client.repo(params.repo).issues(function (err, data, headers) {
    if (err) { return callback(err); }
    
  });
};