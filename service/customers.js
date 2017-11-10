var request = require('request');
var token = process.env.CVPToken;
var rp = require('request-promise');
var url = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers/';
var options = {
    uri: url,
    headers: {
        'Authorization': 'Token token=' + token
    }
};
var result;
var customerarray = [];

exports.GetCustomers = function(res) {
        rp(options).then(function (content) {
            result = JSON.parse(content);           
            result = result['customers'];
            console.log(result.length);

        }).catch(function (err) { 
            console.log(err);      
            res.status(500);
            res.end("No Data");
         
        })
        .finally(function(){
            var promise = GetCustomerDetails(options);
            promise.then((successmessage) => {
                res.writeHead(200, {"Content-Type": "application/json" });
                res.end(JSON.stringify(customerarray));
            });
            promise.catch((errormessage) => {
                res.writeHead(500, {"Content-Type": "application/json" });
                res.end("No Data");
            }); 

        });    
    }

    function GetCustomerDetails(options) {
        return new Promise((resolve, reject) => {
            rp(options).then(function (data){
                customer = JSON.parse(data);
                customer["_updated"] = customer["updated_at"];
                customerarray.push(customer);              
                resolve("Success!");
            })
            .catch(function(err) {
                console.log("error: " +err);            
                reject("Ack, noes");
            })
            .finally (function(){
                Object(result).forEach(function (element, key, _array) {
                    options.uri = url + element["_id"];
                    GetCustomerDetails(options);
                });
            });
        })
    }