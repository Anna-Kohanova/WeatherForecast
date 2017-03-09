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
    var city = request.params.city;
            var options = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/'+type+'?q='+city+'&APPID='+config.app.appid
        };
        var callback = function(responseCallback) {
            var str='';
            responseCallback.on('data', function (chunk) {
                str += chunk;
            });

            responseCallback.on('end', function () {
                var weather = JSON.parse(str);
                response.end("<html><head></head><body><p id='str' style='visibility:hidden'>"+str+"></p><div id='img'></div><script>var data = JSON.parse(document.getElementById('str').innerHTML.substring(0,document.getElementById('str').innerHTML.length-4)); document.getElementById('img').innerHTML='<img src=\"http://openweathermap.org/img/w/' + data.weather[0].icon + '.png\">'; console.log(data); </script></body></html>");
            });
        }
        http.request(options, callback).end(); 
}


exports.current = current;
exports.forecast = forecast;
exports.makeQuery = makeQuery;

