var express = require('express');
var router = express.Router();
var handlers = require('../handlers');

router.use(function timeLog(req, res, next) {
  console.log('we call forecast router');
  next();
});

router.route('/')
    .get(function(req, res){
        handlers.forecast(req, res);
    })

module.exports = router;