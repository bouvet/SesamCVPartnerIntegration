var express = require('express');

var app = express();
var host = "0.0.0.0";
var port = 5000;
var users = require('./users');

app.route('/users').get(function(Req, res) {
  console.log("HTTP GET on /users");
  users.GetUsers();
});

app.listen(5000, function () {
    console.log('CVPartnerService listening on port ' +port +'.');
});
