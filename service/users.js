var request = require('request');
var userarray = [];
var token = process.env.CVPToken;
exports.GetUsers = function(res) {
    
    var url = 'https://bouvet.cvpartner.com/api/v1/users?offset=';
    var offset = 0;
    var options = {
        uri: url+offset,
        headers: {
            'Authorization': 'Token token="${token}"'
        }
    };

    function loop() {
        var offsetempty = false;
        if(!offsetempty) {
            console.log(offsetempty)
            request(options, callback);
            console.log(userarray.length);
        }
        console.log(userarray.length);
    }

    function callback(error, response, body) {
        console.log("error: " +error);
        console.log(response);
        
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(response);
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

