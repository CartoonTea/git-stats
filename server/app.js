var express       = require('express');
var app           = express();
var path          = require('path');
var publicFolder  = path.join(__dirname + '/../client');

app.use('/client', express.static(publicFolder));
app.listen(3000);