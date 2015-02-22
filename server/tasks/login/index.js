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
    
    var user;

    client = github.client(token);
    client.me().emails(function (err, data, headers) {
      if (err) {
        callback(err);
        return;
      }
      
      userEmail = _.where(data, { primary: true })[0].email;
      models.User.findOrCreate({
        where: {
          email: userEmail
        }
      }).spread(function(instance, created) {
        instance.set('oauthtoken', token);
        instance.save().then(function (saved) {
          callback(null, instance);
        }).catch(function (err) {
          callback(err);
        });
      }).catch(function(err){
        callback(err);
      });
    });
  });
};