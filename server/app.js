var express       = require('express');
var validator     = require('express-validator');
var session       = require('express-session');
var bodyParser    = require('body-parser');
var app           = express();
var path          = require('path');
var publicFolder  = path.join(__dirname + '/../client');
var tasks         = require('./tasks');
var port = 3000;
var helpers;


/**
 * GLOBALS
 */
global.github = require('octonode');
global.client = {};  // set up github client after auth
global._ = require('lodash');
global.sequelize = {};
global.models = require('./models');



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
  resave: false,
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
    }
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
    req.session.token = data.token;
    res.status(200).json(data).end();
  });
});

// gets a session
app.get('/api/session', function (req, res) {
  if (!req.session.email || !req.session.token) {
    return res.status(400).json({ error: 'not logged in' }).end();
  }

  res.status(200).json({
    email: req.session.email,
    token: req.session.token
  }).end();
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

// redirect all other requests to the index file
app.get('*', function (req, res) {
  res.sendFile(publicFolder + '/index.html');
});



/**
 * LISTEN UP
 */

// set server listenin
app.listen(port);
console.log('(ノಠ益ಠ)ノ GIT STATS ROLLIN\' ON PORT ' + port + ' щ(ಠ益ಠщ)');