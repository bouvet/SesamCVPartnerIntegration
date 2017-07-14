var request = require('request');
var userarray = [];
exports.GetUsers = function(res) {
    
    var url = '';
    var offset = 0;
    var options = {
        url: url,
        headers: {
            ''
        }
    };

    function loop() {
        var offsetempty = false;
        if(!offsetempty) {
            
            request(options, callback);
            loop();
        }
        console.log(userarray.length);
    }

    function callback(error, response, body) {
        console.log("callback");
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log(info.length);
            if(info.length > 0) {
                userarray.push(info);
            } else {
                offsetempty = true;
            }    
            

                
        }
    }

    loop();
}

