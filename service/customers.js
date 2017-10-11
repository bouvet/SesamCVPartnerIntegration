var request = require('request');
var token = process.env.CVPToken;
var rp = require('request-promise');



exports.GetCustomers = function(res) {
    var customerarray = [];
    var url = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers/';
   
    var options = {
        uri: url,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };
        rp(options).then(function (content) {
            var result = JSON.parse(content);
           
            result = result['customers'];
            console.log(result.length);
            Object(result).forEach(function (element, key, _array) {                    
                customerarray.push(element);
             });

            res.writeHead(200, {"Content-Type": "application/json" });
            res.end(JSON.stringify(result));
            console.log("Instances: " + customerarray.length);

        }).catch(function (err) { 
            console.log(err);      
            res.status(500);
            res.end("No Data");
         
        });    
    }