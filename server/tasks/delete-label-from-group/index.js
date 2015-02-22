module.exports = function (params, callback) {
  var groupId = params.groupId;
  var labelId = params.labelId;

  models.LabelInGroup.findOne({
    where: {
      LabelGroupId: groupId,
      LabelId: labelId
    }
  }).then(function (label) {
    label.destroy().then(function () {
      callback();
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};