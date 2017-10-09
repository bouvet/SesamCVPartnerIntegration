var request = require('request');
var token = process.env.CVPToken;
var rp = require('request-promise');
var express = require('express');
var userarray = [];


  exports.GetUsers = function(res) {
     userarray = [];
    var url = 'https://bouvet.cvpartner.com/api/v1/users?limit=1400';
   // var url = 'https://bouvet.cvpartner.com/api/v1/users?offset=100&limit=1200';
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


        return userarray;
    }
    

 
      // Henter cv'en til alle brukere i Region Bergen
    exports.GetUserCv = function (res) { 
        var urls = [];
        var userID = "";
        var cvId = "";
        var options = "";        
        var request_array = [];
        var regision = "";

        userarray.forEach(function(element) {                   
                userID = element["user_id"];
                cvId = element["default_cv_id"];
                region = element["office_name"];

                if(region === "Region Bergen"){
                 
                    options = {
                        uri: "https://bouvet.cvpartner.com/api/v3/cvs/"+ userID + "/" + cvId,
                        headers: {
                            'Authorization': 'Token token=' + token
                        }
                    };       
                         
                    urls.push(options);

                }
            
                });
              
                
                var timeout = 0;
                var count = 0;
                var result = []; 
                var resultSet = [];
                request_array = urls.map((item) => {                 
                    result[count++] = new Promise((resolve) => {   
                    setTimeout(function (){  
                        rp(item).then(function (content) {
                            resultSet.push(JSON.parse(content));                           
                            resolve(content);   
                            console.log("Instances: " + resultSet.length);
                          })
                          .catch(function (err) {
                           console.log(err);
                          });
                          
                    }, timeout += 250);                                      
                    });
                })
               
                Promise.all(result).then(values =>  {  
                      res.end(JSON.stringify(resultSet));  
                 });
             } 
