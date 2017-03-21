var crontab = require('node-crontab');
var levelup = require('level')

//сurrentDB = levelup('./currentDB');
//forecastDB = levelup('./forecastDB');

var jobId = crontab.scheduleJob("*/2 * * * *", function(){ //This will call this function every 2 minutes 
    console.log("It's been 2 minutes!");
    сurrentDB.createKeyStream()
        .on('data', function (data) {
            console.log('current key=', data);
            
            сurrentDB.put(data, 'new value', function(err){
                if (err) return console.log(err);
            });
            
        });
    forecastDB.createKeyStream()
        .on('data', function (data) {
            console.log('forecast key=', data)
        });
    
});
module.export = jobId;