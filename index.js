var server = require('./server');
var router = require("./router");
var handlers = require("./handlers");

var handle = {}
handle["/"] = handlers.current;
handle["/weather/current"] = handlers.current;
handle["/weather/forecast"] = handlers.forecast;


server.start(router.route, handle);
