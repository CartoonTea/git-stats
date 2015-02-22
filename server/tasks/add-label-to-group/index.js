module.exports = function (params, callback) {
  var groupId = params.groupId;
  var labelId = params.labelId;
  var value = params.value;

  models.LabelGroup.findOne({
    where: {
      id: groupId
    }
  }).then(function (labelGroup) {
    if (!labelGroup) { return callback({error: 'label group not found'}); }
    models.Label.findOne({
      where: {
        id: labelId
      }
    }).then(function (label) {
      if (!label) { return callback({error: 'label not found'}); }
      models.LabelInGroup.findOrCreate({
        where: {
          LabelGroupId: labelGroup.id,
          LabelId: label.id
        }
      }).spread(function (labelInGroup, created) {
        labelInGroup.set('value', value);
        labelInGroup.save().then(function (labelInGroup) {
          callback(null, labelInGroup);
        }).catch(function (err) {
          callback(err);
        });
      callback(null, labelInGroup);
      }).catch(function (err) {
        callback(err);
      });
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};