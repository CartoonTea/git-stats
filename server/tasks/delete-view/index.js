module.exports = function (params, callback) {
  var id = params.id;
  models.View.findOne({
    id: id
  }).then(function (view) {
    if (!view) { return callback({error: 'view not found'}); }
    view.destroy().then(function () {
      callback();
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};