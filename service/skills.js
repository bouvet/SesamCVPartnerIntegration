var request = require('request');
var token = process.env.CVPToken;
var rp = require('request-promise');
var skills = [];


  exports.getSkills = function(res) {
    categories = [];
    var url = 'https://bouvet.cvpartner.com/api/v1/masterdata/technologies/tags?offset=0&limit=5000';
    var options = {
        uri: url,
        headers: {
            'Authorization': 'Token token=' + token
        }
    };
        rp(options).then(function (content) {
            var result = JSON.parse(content);
            Object(result).forEach(function (element, key, _array) {                    
                skills.push(element);
             });

            res.writeHead(200, {"Content-Type": "application/json" });
            res.end(JSON.stringify(skills));
            console.log("Instances: " + skills.length);

        })
        .catch(function (err) {       
            res.status(500);
            res.end("No Data");  
        });    


        return skills;
    }
    

    exports.getSkillCategories = function(res) {
        skillCategories = [];
        var url = 'https://bouvet.cvpartner.com/api/v1/unapproved/no/technologies/tags?limit=1000&offset=0';
        var options = {
            uri: url,
            headers: {
                'Authorization': 'Token token=' + token
            }
        };
            rp(options).then(function (content) {
                var result = JSON.parse(content);
                result = result['wrapper']["terms"];

                Object(result).forEach(function (element, key, _array) {                    
                    skillCategories.push(element);
                 });
    
                res.writeHead(200, {"Content-Type": "application/json" });
                res.end(JSON.stringify(skillCategories));
                console.log("Instances: " + skillCategories.length);
    
            })
            .catch(function (err) {       
                res.status(500);
                res.end("No Data");  
            });    
    
    
            return skillCategories;
        }
        
    
    
  