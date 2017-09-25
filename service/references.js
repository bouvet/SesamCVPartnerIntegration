var rp = require('request-promise');
var request = require('request');
var token = process.env.CVPToken;

var referenceurl = 'https://bouvet.cvpartner.com/api/v3/references/search?size=1000&from=0';
var cvcustomerurl = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers/';
var projecturl = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers/58e3585da37d2507c55b7767/projects/5951113effaf19074a1bacf4';

var resultSet = [];

exports.GetAllReferences = function (res) {
    var options = {
        uri: referenceurl,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };

    rp(options)
    .then(function (content) {
        var result = JSON.parse(content);
        res.writeHead(200, {"Content-Type": "application/json" });
        res.end(JSON.stringify(result));
    })
    .catch(function (err) {
        res.end("No Data");
        res.status(500);
     
    });
  
}

   exports.GetCustomerProject = function (res) { 
    var references =  []; 
        var options1 = {
            uri: referenceurl,
            headers: {
                'Authorization': 'Token token=' + token
            }
        };

        var urls = [];
        let request_array = [];

        rp(options1).then(function (content) {
            var result = JSON.parse(content);
            res.writeHead(200, {"Content-Type": "application/json" });
            references = result[Object.keys(result)[0]];

            var customerId = "";
            var projectId = "";
            var options2 = "";        

                   references.forEach(function(element) {                   
                    customerId = element["reference"]["company_customer_id"];
                    projectId = element["reference"]["company_project_id"];
               
                    options2 = {
                           uri: "https://bouvet.cvpartner.com/api/v2/company/cv/customers/"+ customerId + "/projects/" + projectId,
                           headers: {
                               'Authorization': 'Token token=' + token
                           }
                       };       
                                    
                    urls.push(options2);
            }, this);
   
            var timeout = 0;
            var count = 0;
            var result = []; 
          
            request_array = urls.map((item) => {                 
                result[count++] = new Promise((resolve) => {   
                setTimeout(function (){  
                    rp(item).then(function (content) {
                        resultSet.push(content);                           
                        resolve(content);        
                      })
                      .catch(function (err) {
                       console.log(err);
                      });
                      
                }, timeout += 300);                                      
                });
            })
          
            Promise.all(result).then(values =>  {          
                   res.end(JSON.stringify(resultSet));
             });

        }).catch(function (err) {
            res.end(err);
            res.status(500);
           
        })
       
} 

