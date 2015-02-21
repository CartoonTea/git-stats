/**
 * Logs a user in
 */
module.exports = function (data, callback) {
  github.auth.login(code, function (err, token) {
    if (err) { 
      callback(err);
      return;
    }
    client = github.client(token);
    client.me().info(function (err, data, headers) {
      if (err) {
        callback(err);
        return;
      }
      data.token = token;
      return data;
    });
  });
};