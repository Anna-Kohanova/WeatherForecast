var config = require('./config');
var url = require('url');
var http = require('http');
var levelup = require('level')

сurrentDB = levelup('./currentDB');
forecastDB = levelup('./forecastDB');

function current(city, callback) {
    сurrentDB.get(city, function(err, value) {
      if (!err){
         return callback(null, value);
      }
      if (err.notFound) {
          console.log('not found');
          return makeQuery(city, 'weather', callback);
      }
    return callback(err);


    })
}

function forecast(city, callback) {
    forecastDB.get(city, function(err, value) {
        if (!err){
           return callback(null, value);
        }
        if (err.notFound) {
            console.log('not found');
            return makeQuery(city, 'forecast', callback);
        }
      return callback(err);
    })
}

function makeQuery(city, type, callback) {
    var options = {
        host: 'api.openweathermap.org',
        path: '/data/2.5/' + type + '?q=' + city + '&units=metric&APPID=' + config.app.appid
    };
    var next = function(responseCallback) {
        var str = '';
        responseCallback.on('data', function(chunk) {
            str += chunk;
        });

        responseCallback.on('end', function() {
            var weather = JSON.parse(str);
            callback(null, str);
            if (type == 'weather') {
                сurrentDB.put(city, str, function(err) {
                    if (err) throw err;
                });
            } else {
                forecastDB.put(city, str, function(err) {
                    if (err) throw err;
                });
            }

        });
    }
    http.request(options, next).end();

}


exports.current = current;
exports.forecast = forecast;
exports.makeQuery = makeQuery;
