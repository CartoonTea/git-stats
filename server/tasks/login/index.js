/**
 * Logs a user in
 */
module.exports = function (data, callback) {
  var user = {};
  github.auth.login(data.code, function (err, token) {
    if (err) { 
      callback(err);
      return;
    }
    user.token = token;
    client = github.client(token);
    client.me().emails(function (err, data, headers) {
      if (err) {
        callback(err);
        return;
      }
      user.email = _.where(data, { primary: true })[0].email;
      callback(null, user);
    });
  });
};