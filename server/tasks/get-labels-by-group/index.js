module.exports = function (params, callback) {
  var id = params.groupId;
  models.LabelInGroup.findAll({
    where: {
      LabelGroupId: id
    }
  }).then(function (labelInGroup) {
    callback(null, labelInGroup);
  }).catch(function (err) {
    callback(err);
  });
};