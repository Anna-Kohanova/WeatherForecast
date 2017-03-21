var config = require('./config');
var url = require('url');
var http = require('http');
var levelup = require('level')

 сurrentDB = levelup('./currentDB');
forecastDB = levelup('./forecastDB');

function current(request, response){
    сurrentDB.get(request.params.city, function(err, value){
        if (err) {
    if (err.notFound) {
      console.log('not found');
        makeQuery(request,response, 'weather');
      return;
    }
    // I/O or other error, pass it up the callback chain
    return err;
  }

    response.json(value);
    })
}
function forecast(request, response){
    forecastDB.get(request.params.city, function(err, value){
        if (err) {
    if (err.notFound) {
      console.log('not found');
        makeQuery(request,response, 'forecast');
      return;
    }
    // I/O or other error, pass it up the callback chain
    return err;
  }

    response.json(value);
    })
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
                response.json(str);
                if(type=='weather'){
                    сurrentDB.put(city, str, function(err){
                        if (err) return console.log(err);
                    });
                }
                else {
                    forecastDB.put(city, str, function(err){
                        if (err) return console.log(err);
                    });
                }

            });
        }
        http.request(options, callback).end(); 
    
}


exports.current = current;
exports.forecast = forecast;
exports.makeQuery = makeQuery;

