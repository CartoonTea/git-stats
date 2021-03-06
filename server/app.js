var express       = require('express');
var validator     = require('express-validator');
var session       = require('express-session');
var bodyParser    = require('body-parser');
var app           = express();
var path          = require('path');
var publicFolder  = path.join(__dirname + '/../client');
var colors        = require('colors');
var port = 3000;
var helpers;


/**
 * GLOBALS
 */
global.github = require('octonode');
global.client = {};  // set up github client after auth
global._ = require('lodash');
global.sequelize = {};
global.models = require('./models')();
global.tasks = require('./tasks');
global.async = require('async');



/**
 * GITHUB CONFIGURATION
 */

var githubEnv = {
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET
};
if (!githubEnv.id || !githubEnv.secret) {
  console.log('You need to export the GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables!');
  process.exit(0);
}
github.auth.config(githubEnv);



/**
 * EXPRESS CONFIGURATION
 */

app.use('/client', express.static(publicFolder));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(validator());
app.use(session({
  secret: 'blender dem webz eh',
  resave: true,
  saveUninitialized: true
}));
app.use(function (req, res, next) {
  if (req.session.token) {
    client = github.client(req.session.token);
  }
  next();
});



/**
 * ROUTING HELPERS
 */
helpers = {

  // validates a users auth
  checkAuth: function (req, res, callback) {

    if (!req.session.token) {
      return res.status(400).json({error: 'not logged in'}).end();
      callback();
    }
    console.log(JSON.stringify(req.session).red);
    callback();
  }

};



/**
 * ROUTING
 */

// creates a session
app.post('/api/session', function (req, res) {
  var errors;
  req.checkBody('code', 'code parameter is missing').notEmpty();
  errors = req.validationErrors();
  if (errors) {
    res.status(400).json(errors).end(); 
    return;
  }
  tasks.login({ code: req.body.code }, function (err, data) {
    if (err) { 
      res.status(400).send(err.toString());
      return;
    }
    req.session.email = data.email;
    req.session.token = data.oauthtoken;
    res.status(200).json(data.toJSON()).end();
  });
});

// gets a session
app.get('/api/session', function (req, res) {
  helpers.checkAuth(req, res, function () {
    res.status(200).json({
      email: req.session.email,
      token: req.session.token
    }).end();
  });
});

// destroys a session
app.delete('/api/session', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).end();
    }
    res.status(204).end();
  });
});

// retrieves repos
app.get('/api/repos', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.listRepos({}, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(200).json(data).end();
    });
  });
});

// retrieves a repo
app.get('/api/repos/:org/:repo', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.updateRepo({
      owner: req.params.org,
      name: req.params.repo
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      tasks.renderRepo({
        owner: req.params.org,
        name: req.params.repo
      }, function (err, data) {
        if (err) { return res.status(500).json(err).end(); }
        res.status(200).json(data).end();
      });
    });
  });
});

// creates a label group for a repo
app.post('/api/repos/:org/:repo/groups', function (req, res) {
  helpers.checkAuth(req, res, function () {
    console.log(JSON.stringify(req.body).red);
    tasks.addRepoGroup({
      org: req.params.org,
      repo: req.params.repo,
      name: req.body.name
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(201).json(data).end();
    });
  });
});

// retrieves label groups for a repo
app.get('/api/repos/:org/:repo/groups', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.getRepoGroups({
      org: req.params.org,
      repo: req.params.repo
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(200).json(data).end();
    });
  });
});

// retrieves labels for a repo
app.get('/api/repos/:org/:repo/labels', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.getLabelsByRepo({
      org: req.params.org,
      repo: req.params.repo
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(200).json(data).end();
    });
  });
});

// deletes a label group
app.delete('/api/groups/:id', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.deleteLabelGroup({
      id: req.params.id
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(204).end();
    });
  });
});

// add label to group
app.post('/api/groups/:id/labels', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.addLabelToGroup({
      groupId: req.params.id,
      labelId: req.body.label,
      value: req.body.value
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(201).json(data).end();
    });
  });
});

// update label for group
app.put('/api/label-in-group/:id', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.updateLabel({
      id: req.params.id,
      value: req.body.value
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(200).json(data).end();
    });
  });
});

// get labels from group
app.get('/api/groups/:id/labels', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.getLabelsByGroup({
      groupId: req.params.id
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(200).json(data).end();
    });
  });
});

// delete label from group
app.delete('/api/groups/:groupId/labels/:labelId', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.deleteLabelFromGroup({
      groupId: req.params.groupId,
      labelId: req.params.labelId
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(204).json(data).end();
    });
  });
});

// add view
app.post('/api/repos/:org/:repo/views', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.addViewToRepo({
      formula: req.body.formula,
      org: req.params.org,
      repo: req.params.repo
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(200).json(data).end();
    });
  });
});

// get views
app.get('/api/repos/:org/:repo/views', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.getViewsByRepo({
      org: req.params.org,
      repo: req.params.repo
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(200).json(data).end();
    });
  });
});

// delete view
app.delete('/api/views/:id', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.deleteView({
      id: req.params.id
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(201).json(data).end();
    });
  });
});

// render view
app.get('/api/views/:id/render', function (req, res) {
  helpers.checkAuth(req, res, function () {
    tasks.renderView({
      id: req.params.id
    }, function (err, data) {
      if (err) { return res.status(500).json(err).end(); }
      res.status(200).json(data).end();
    });
  });
});

// redirect all other requests to the index file
app.get('*', function (req, res) {
  res.sendFile(publicFolder + '/index.html');
});



/**
 * LISTEN UP
 */

// set server listenin
app.listen(port);
var listenString = '(ノಠ益ಠ)ノ GIT STATS ROLLIN\' ON PORT ' + port + ' щ(ಠ益ಠщ)'
console.log(listenString.rainbow);