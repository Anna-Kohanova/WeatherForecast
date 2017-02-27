var http = require('http');
var app = require("./config").app;
var server = http.createServer(function (req,res){
    req.on('error', function(err) {
    console.error(err);
    res.statusCode = 400;
    res.end();
  });
  res.on('error', function(err) {
    console.error(err);
  });
    if(req.method=='GET' && req.url=='/weather/curent'){
        //var appid = 'c7e65948d4874ed25b540fc80bca077b';
        var options = {
            host: 'api.openweathermap.org',
            path: '/data/2.5/weather?q=London,uk&APPID='+app.appid
        };
        
        callback = function(response) {
            var str='';
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                var weather = JSON.parse(str);
                console.log("weather:"+weather.coord.lon);
                res.end("<html><head></head><body><p id='str'>"+str+"></p><script> console.log(JSON.parse(document.getElementById('str').innerHTML.substring(0,455))); </script></body></html>");
            });
        }
        
        http.request(options, callback).end(); 
    
    }
    else {
        res.statusCode = 404;
        res.end();
    }
    
}).listen(app.port);
