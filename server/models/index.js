
var Sequelize = require('sequelize');

var sequelize = new Sequelize('dfpopfrfn1j5rj', 'nnznipgqreabcm', '_BS9rsTBcv3qUfkRwe3rescmR3', {
  host: 'ec2-23-21-94-137.compute-1.amazonaws.com:5432',
  dialect: 'postgres',
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
    title:Sequelize.STRING,
    user:Sequelize.STRING,
    createdAt:{type:Sequelize.DATE,field:'created_at'},
    closedAt:{type:Sequelize.DATE,field:'closed_at'}
}, {
  freezeTableName: true 
});

var Label = sequelize.define('Label',{
    text:Sequelize.STRING,
    color:Sequelize.STRING
    }, {
  freezeTableName: true 
});

var User = sequelize.define('User',{
    email:Sequelize.STRING,
    oauthtoken:{type:Sequelize.STRING,field:'oauth_token'}
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

//Specify Relations/Associations between models
Repository.hasMany(Issue,{as:'issues'});
Issue.hasMany(Label,{as:'labels'});
Repository.hasMany(Label,{as:'labels'});
Repository.hasMany(LabelGroup,{as:'labelgroups'});
Label.hasMany(LabelInGroup,{as:'values'});
LabelGroup.hasMany(LabelInGroup,{as:'values'});

module.exports={Repository:Repository,Issue:Issue,Label:Label,LabelGroup:LabelGroup,LabelInGroup:LabelInGroup,User:User}


