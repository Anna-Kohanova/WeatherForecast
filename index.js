var express    = require('express');    
var app        = express();                 
var bodyParser = require('body-parser');

const localConfig = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var current = require('./router/current');
var forecast = require('./router/forecast');

app.use('/current', current);
app.use('/forecast', forecast);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(localConfig.app.port);
