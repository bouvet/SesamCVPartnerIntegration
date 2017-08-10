var request = require('request');
var userarray = [];
var token = process.env.CVPToken;
exports.GetUsers = function(res) {
    
    var url = 'https://bouvet.cvpartner.com/api/v1/users?offset=';
    var offset = 0;
    var offsetempty = false;
    var options = {
        uri: url+offset,
        headers: {
            'Authorization': 'Token token=' + token
            
        }
    };
    
    function loop() {
        
        
        loop();
    }

    function callback(error, response, body) {

        
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            
            if(info.length > 0) {
                userarray.push(info);
            } else {
                offsetempty = true;
            }    
            

                
        }
    }
    console.log(options.headers);
    request(options, callback);

    
}

