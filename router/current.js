var express = require('express');
var router = express.Router();
var handlers = require('../handlers');

router.use(function timeLog(req, res, next) {
  console.log('we call current router');
  next();
});
router.route('/:city')
    .get(function(req, res){
        handlers.current(req, res);
    })

module.exports = router;