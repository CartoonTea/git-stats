

module.exports = function (callback) {
  var Sequelize = require('sequelize');

  sequelize = new Sequelize('bla', 'bla', 'bla', {
    host: 'ec2-23-21-94-137.compute-1.amazonaws.com',
    port: '5432',
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });


  //Create sequelize models
  //based on data-model.png
  var Repository = sequelize.define('Repository',{
      owner: Sequelize.STRING,
      name: Sequelize.STRING,
      lastUpdated:{type:Sequelize.DATE,field:'last_updated'}
  }, {
    freezeTableName: true 
  });

  var Issue = sequelize.define('Issue',{
      url: Sequelize.STRING,
      state: Sequelize.STRING,
      title: Sequelize.STRING,
      user: Sequelize.STRING,
      created_at: Sequelize.STRING,
      closed_at: Sequelize.STRING,
      update_at: Sequelize.STRING
  }, {
    freezeTableName: true 
  });

  var Label = sequelize.define('Label',{
      url: Sequelize.STRING,
      name:Sequelize.STRING,
      color:Sequelize.STRING
      }, {
    freezeTableName: true 
  });

  var User = sequelize.define('User',{
      email:Sequelize.STRING,
      oauthtoken: {
        type: Sequelize.STRING,
        field: 'oauth_token'}
      }, {
    freezeTableName: true 
  });

  var LabelGroup = sequelize.define('LabelGroup',{
      name:Sequelize.STRING
      }, {
    freezeTableName: true 
  });

  var LabelInGroup = sequelize.define('LabelInGroup',{
      value:Sequelize.FLOAT
      }, {
    freezeTableName: true 
  });

  var View = sequelize.define('View', {
    formula: Sequelize.STRING
  }, {
    freezeTableName: true
  });

  var out

  function setOut(){
      out = {
    Repository: Repository,
    Issue: Issue,
    Label: Label,
    LabelGroup: LabelGroup,
    LabelInGroup: LabelInGroup,
    User: User,
    View: View
  };
  }

  setOut();

  Label.belongsTo(Repository);
  LabelGroup.belongsTo(Repository);
  Issue.belongsTo(Repository);
  Issue.hasMany(Label);
  Label.hasMany(LabelInGroup);
  LabelGroup.hasMany(LabelInGroup);
  View.belongsTo(Repository);

  sequelize.sync();

  //Specify Relations/Associations between models
  // Repository.hasMany(Issue,{as:'issues'});
  // Issue.hasMany(Label,{as:'labels'});
  // Repository.hasMany(Label,{as:'labels'});
  // Repository.hasMany(LabelGroup,{as:'labelgroups'});
  // Label.hasMany(LabelInGroup,{as:'values'});
  // LabelGroup.hasMany(LabelInGroup,{as:'values'});

  setOut();

  return out;
};
