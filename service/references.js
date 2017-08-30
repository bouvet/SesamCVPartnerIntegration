var rp = require('request-promise');
var token = process.env.CVPToken;
var references = [];
var customers = [];
var size = 10;
var from = 0;
var referenceurl = 'https://bouvet.cvpartner.com/api/v3/references/search?size=1000&from=0';
var cvcustomerurl = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers/';
var projecturl = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers/';
//var referencesize = '&size='+size;

// exports.GetReferences = function(res) {
//     var options = {
//         uri: referenceurl,
//         headers: {
//             'Authorization': 'Token token=' + token
//         }
//     };

//     function searchcallback(error, response, body) {
//         if(error) {
//             console.log("error : " +error + " : " +response.statusCode);
//         }
        
//         if (!error && response.statusCode == 200) {             
//             var result = JSON.parse(body);

//             if(result != null && result.references.length > 0) {
//                 var totalreferences = result.total;
                     
//                 Object(result.references).forEach(function (element, key, _array) {
//                     references.push(element);
//                 });
//                 if(from < totalreferences) {
//                     console.log("tada");
//                     from = from +10;
//                     options.uri = referenceurl + from;
//                     setTimeout(timeoutrequest,300);
//                 }                

//             } else {
//                 console.log("Antall referanser hentet: " +references.length);
//                 Object(references).forEach(function (element, key, _array) {
//                    var url = cvcustomerurl +element.reference.company_customer_id;
//                    console.log("tada");
//                    options.uri = url;
//                 });
//                 Object(customers).forEach(function (element, key, _array) {
//                     var url = projecturl + element.company_customer_id +'/projects/' +company_customer_id;
//                     console.log(url); 
//                 });
//             }
//         } else {
            
//         }
//     };

//     function timeoutrequest() {
//         request(options,customercallback);         
//     }

//     function customercallback(error, response, body) {
//         if(error) {
//             console.log("error : " +error + " : " +response.statusCode);
//         }

//         if (!error && response.statusCode == 200) {         
//             customers.push(JSON.parse(body));
//             console.log("added customer");
//         }

//     }

//     function projectcallback(error, response, body) {
//         if(error) {
//             console.log("error : " +error + " : " +response.statusCode);
//         }

//         if (!error && response.statusCode == 200) {         
//             customers.push(JSON.parse(body));
//         }

//     }

//     request(options, searchcallback);

// }

exports.GetAllReferences = function (res) {
    var options = {
        uri: referenceurl,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };

    rp(options)
    .then(function (repos) {
        console.log(repos);
    })
    .catch(function (err) {
        // API call failed...
    });

}