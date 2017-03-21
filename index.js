var express    = require('express');    
var app        = express();                 
var bodyParser = require('body-parser');
var cors = require('cors');


const localConfig = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var current = require('./router/current');
var forecast = require('./router/forecast');


app.use(cors());
app.use('/current', current);
app.use('/forecast', forecast);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(localConfig.app.port);

var sheduler = require('./sheduler');
//