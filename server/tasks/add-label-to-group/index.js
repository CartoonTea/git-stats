module.exports = function (params, callback) {
  var groupId = params.groupId;
  var labelId = params.labelId;
  var value = params.value;

  models.LabelGroup.findOne({
    where: {
      id: groupId
    }
  }).then(function (labelGroup) {
    models.Label.findOne({
      where: {
        id: labelId
      }
    }).then(function (label) {
      models.LabelInGroup.findOrCreate({
        where: {
          LabelGroupId: labelGroup.id,
          LabelId: label.id
        }
      }).then(function (labelInGroup) {
        labelInGroup.set('value', 'hi');
        labelInGroup.save().then(function (labelInGroup) {
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
  }).catch(function (err) {
    callback(err);
  });
};