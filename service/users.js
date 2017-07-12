var http = require('http');

exports.GetUsers = function(res) {
    
    var url = 'https://bouvet.cvpartner.com/api/v1/users?offset=';
    var offset = 0;


    function loop() {
        var offsetempty = false;
        if(offsetempty) {
            http.request(url + page, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    console.log(body.length);
                }
                offset = offset + 100;
                if(offset > 2000) {
                    offsetempty = true;
                }
                loop();
            });
        }
    }
}

