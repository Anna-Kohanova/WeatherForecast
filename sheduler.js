var crontab = require('node-crontab');
var levelup = require('level');
var makeQuery = require('./handlers').makeQuery;

//сurrentDB = levelup('./currentDB');
//forecastDB = levelup('./forecastDB');

var jobId = crontab.scheduleJob("0 */10 * * * *", function(){ //This will call this function every 2 minutes 
    console.log("It's been 10 minutes!");
    сurrentDB.createKeyStream()
        .on('data', function (data) {
            
            
        makeQuery(data, 'weather', function(result){
            сurrentDB.put(data, result, function(err){
                if (err) throw err;
            });
        });
            
            
        });
    forecastDB.createKeyStream()
        .on('data', function (data) {
            makeQuery(data, 'forecast', function(result){
            сurrentDB.put(data, result, function(err){
                if (err) throw err;
            });
            
        });
        });
    
});
module.export = jobId;