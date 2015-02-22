module.exports = function (params, callback) {
  var id = params.id;
  var value = params.value;

  models.LabelInGroup.findOne({
    where: {
      id: id
    }
  }).then(function (label) {
    if (!label) { return callback({ error: 'label not found' }); }
    label.set('value', value);
    label.save().then(function (label) {
      callback(null, label);
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};