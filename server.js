var http = require('http');
var url = require("url");
var config = require('./config');
function start(route, handle){
    console.log("port:"+config.app.port);
    var server = http.createServer(function(req, res){
        var pathname = url.parse(req.url).pathname;
        console.log(pathname);
        
        route(handle,pathname,req,res);
    }).listen(config.app.port);
}

exports.start = start;