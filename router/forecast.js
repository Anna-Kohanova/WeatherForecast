var express = require('express');
var router = express.Router();
var handlers = require('../handlers');


router.route('/:city')
    .get(function(req, res){
        handlers.forecast(req, res);
    })

module.exports = router;