/**
 * 1. Extract all groups referenced in the formula
 * 2. Find the Groups
 * 3. Find the LabelInGroups
 * 4. Find all the Labels
 * 5. Find all issues for the 
 */

module.exports = function (params, callback) {
  var org = params.owner;
  var repo = params.name;
  var issues = [];
  models.Repository.findOne({
    where: {
      owner: org,
      name: repo
    }
  }).then(function (repo) {
    models.Issue.findAll({
      where: {
        RepositoryId: repo.id
      }
    }).then(function (sIssues) {
      async.each(sIssues, function (sIssue, done) {
        var issue = sIssue.toJSON();
        issue.values = {};
        sIssue.getLabels().then(function (labels) {
          async.each(labels, function (label, done) {
            models.LabelInGroup.findAll({
              where: {
                LabelId: label.id
              }
            }).then(function (labelInGroups) {
              async.each(labelInGroups, function (labelInGroup, done) {
                models.LabelGroup.findOne({
                  where: {
                    id: labelInGroup.LabelGroupId
                  }
                }).then(function (labelGroup) {
                  issue.values[labelGroup.name] = labelInGroup.toJSON().value;
                  done();
                }).catch(function (err) {
                  done(err);
                });
              }, function (err) {
                if (err) { return done(err); }
                done();
              });
            }).catch(function (err) {
              done(err);
            });
          }, function (err) {
            if (err) { return done(err); }
            issues.push(issue);
            console.log(JSON.stringify(issues).red);
            done();
          });
        }).catch(function (err) {
          done(err);
        });
      }, function (err) {
        if (err) { return callback(err); }
        callback(null, issues);
      });
    }).catch(function (err) {
      callback(err);
    });
  }).catch(function (err) {
    callback(err);
  });
};