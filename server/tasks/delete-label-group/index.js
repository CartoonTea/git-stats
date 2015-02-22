module.exports = function (params, callback) {
  var id = params.id;

  models.LabelGroup.find({
    where: {
      id: id
    }
  }).then(function (labelGroup) {
    labelGroup.destroy().then(function (done) {
      callback(null, done);
    }).catch(function (err) {
      callback(err);
    })
  }).catch(function (err) {
    callback(err);
  });
};