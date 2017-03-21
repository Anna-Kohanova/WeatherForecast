var config = require('./config');
var url = require('url');
var http = require('http');
var levelup = require('level')

 сurrentDB = levelup('./currentDB');
forecastDB = levelup('./forecastDB');

function current(request, callback){
    var city = request.params.city;
    сurrentDB.get(city, function(err, value){
        if (err) {
    if (err.notFound) {
      console.log('not found');
        makeQuery(city, 'weather',callback);
      return;
    }
    // I/O or other error, pass it up the callback chain
    return err;
  }

    callback(value);
    })
}
function forecast(request, callback){
     var city = request.params.city;
    forecastDB.get(city, function(err, value){
        if (err) {
    if (err.notFound) {
      console.log('not found');
        makeQuery(city,'forecast',callback);
      return;
    }
    // I/O or other error, pass it up the callback chain
    return err;
  }

    callback(value);
    })
}
function makeQuery(city, type, callback) {
     var options = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/'+type+'?q='+city+'&APPID='+config.app.appid
        };
        var next = function(responseCallback) {
            var str='';
            responseCallback.on('data', function (chunk) {
                str += chunk;
            });

            responseCallback.on('end', function () {
                var weather = JSON.parse(str);
                callback(str);
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
        http.request(options, next).end(); 
    
}


exports.current = current;
exports.forecast = forecast;
exports.makeQuery = makeQuery;

