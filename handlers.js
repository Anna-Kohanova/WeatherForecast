var config = require('./config');
var url = require('url');
var http = require('http');
function current(request, response){
    makeQuery(request,response, 'weather');
}
function forecast(request, response){
    makeQuery(request,response, 'forecast');
}
function makeQuery(request,response, type) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    var query = url.parse(request.url, true).query;
    if(query.city!= undefined){
            var options = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/'+type+'?q=London,uk&APPID='+config.app.appid
        };
        var callback = function(responseCallback) {
            var str='';
            responseCallback.on('data', function (chunk) {
                str += chunk;
            });

            responseCallback.on('end', function () {
                var weather = JSON.parse(str);
                response.end("<html><head></head><body><p id='str'>"+str+"></p><script> console.log(JSON.parse(document.getElementById('str').innerHTML.substring(0,455))); </script></body></html>");
            });
        }
        http.request(options, callback).end(); 
        }
    else{
        response.write("Sorry, u dnt send a city=(");
        response.end();
    }
}


exports.current = current;
exports.forecast = forecast;
exports.makeQuery = makeQuery;

