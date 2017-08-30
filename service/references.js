var rp = require('request-promise');
var token = process.env.CVPToken;
var references = [];
var customers = [];
var size = 10;
var from = 0;
var referenceurl = 'https://bouvet.cvpartner.com/api/v3/references/search?size=1000&from=0';
var cvcustomerurl = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers/';
var projecturl = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers/';


exports.GetAllReferences = function (res) {
    var options = {
        uri: referenceurl,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };

    rp(options)
    .then(function (content) {
        console.log(content);
        var result = JSON.parse(content);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    })
    .catch(function (err) {
        res.end("meeh");
        res.status(500);
    });


}

exports.GetCVCustomers = function (res) {
    console.log(res.body);


}