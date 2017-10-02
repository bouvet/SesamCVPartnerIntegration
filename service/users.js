var request = require('request');
var token = process.env.CVPToken;
var rp = require('request-promise');


exports.GetUsers = function(res) {
    var userarray = [];
    var url = 'https://bouvet.cvpartner.com/api/v1/users?offset=100&limit=1200';
   
    var options = {
        uri: url,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };
        rp(options).then(function (content) {
            var result = JSON.parse(content);
            Object(result).forEach(function (element, key, _array) {                    
                userarray.push(element);
             });

            res.writeHead(200, {"Content-Type": "application/json" });
            res.end(JSON.stringify(result));
            console.log("Instances: " + userarray.length);

        })
        .catch(function (err) {       
            res.status(500);
            res.end("No Data");  
        });    
    }
    

