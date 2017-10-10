var request = require('request');
var token = process.env.CVPToken;
var rp = require('request-promise');
var categories = [];


  exports.getTechnologyCategories = function(res) {
    categories = [];
    var url = 'https://bouvet.cvpartner.com/api/v1/masterdata/technologies/category?limit=1000';
    var options = {
        uri: url,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };
        rp(options).then(function (content) {
            var result = JSON.parse(content);
            Object(result).forEach(function (element, key, _array) {                    
                categories.push(element);
             });

            res.writeHead(200, {"Content-Type": "application/json" });
            res.end(JSON.stringify(categories));
            console.log("Instances: " + categories.length);

        })
        .catch(function (err) {       
            res.status(500);
            res.end("No Data");  
        });    


        return categories;
    }
    

  