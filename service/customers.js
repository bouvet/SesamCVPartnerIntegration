var request = require('request');
var token = process.env.CVPToken;
var customerarray = [];
var url = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers';

exports.GetCustomers = function(res) {

    var options = {
        uri: url,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };
    
    function callback(error, response, body) {
        if(error) {
            console.log("error : " +error + " : " +response.statusCode);
        }

        if (!error && response.statusCode == 200) { 
            
            var customers = JSON.parse(body);
            if(customers != null) {         
                Object(customers.customers).forEach(function (element, key, _array) {
                    element._updated = element.updated;                    
                    console.log(element);
                    customerarray.push(element);
                 });

                 res.writeHead(200, { "Content-Type": "application/json" });
                 res.end(JSON.stringify(customerarray));
            } else {
                res.end("meeh");
                res.status(500);
            }
        } else {
            res.end("meeh");
            res.status(500);
        }
    };

    request(options, callback);
};
