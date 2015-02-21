var express       = require('express');
var app           = express();
var path          = require('path');
var publicFolder  = path.join(__dirname + '/../client');
var github        = require('octonode');
var tasks         = require('./tasks');
var models        = require('./models');
var port = 3000;

// serve the client folder statically
app.use('/client', express.static(publicFolder));

// redirect all other requests to the index file
app.get('*', function (req, res) {
  res.sendFile(publicFolder + '/index.html');
});

// set server listenin
app.listen(port);
console.log('(ノಠ益ಠ)ノ GIT STATS ROLLIN\' ON PORT ' + port + ' щ(ಠ益ಠщ)');