var request = require('request');
var userarray = [];
var token = process.env.CVPToken;
var offsetempty = false;
exports.GetUsers = function(res) {
    
    var url = 'https://bouvet.cvpartner.com/api/v1/users?offset=';
    var offset = 0;
    
    var options = {
        uri: url+offset,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };

    function callback(error, response, body) {
        if(error) {
            console.log("error : " +error + " : " +response.statusCode);
        }
        
        
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            
            if(info.length > 0) {                
                Object(info).forEach(function (element, key, _array) {                    
                    userarray.push(element);
                 });

                request(options, callback);
            } else {
                console.log("Fullført traversering av brukere. ");
                console.log("userarray :" +userarray.length);
                offsetempty = true;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(userarray));
            }
            offset = offset + 100;
            options.uri = url+offset;    
            
        } else {

        }
    }
    request(options, callback);

      
}

