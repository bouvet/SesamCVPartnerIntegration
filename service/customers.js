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
        customerarray = null;
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
            // var promise = GetCustomerDetails(options);
            // promise.then((successmessage) => {
            //     res.writeHead(200, {"Content-Type": "application/json" });
            //     res.end(JSON.stringify(customerarray));
            //     console.log(customerarray.length);
            // });
            // promise.catch((errormessage) => {
            //     res.writeHead(500, {"Content-Type": "application/json" });
            //     res.end("No Data");
            // }); 
            res.writeHead(200, {"Content-Type": "application/json" });
            res.end(JSON.stringify(result));
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

    exports.GetIndustry = function(res) {
        var customerarray = [];
        var url = 'https://bouvet.cvpartner.com/api/v1/data_export/industries';
       
        var options = {
            uri: url,
            headers: {
                'Authorization': 'Token token=' + token
            }
        };
            rp(options).then(function (content) {
                var result = JSON.parse(content);
               
                result = result['values'];
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

