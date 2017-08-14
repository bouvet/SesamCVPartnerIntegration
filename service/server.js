var express = require('express');

var app = express();
var host = "0.0.0.0";
var port = 5000;
var users = require('./users');
var company = require('./company');

app.route('/users').get(function(Req, res) {
  console.log("HTTP GET on /users");
  users.GetUsers(res);
});

app.route('/company').get(function(Req, res) {
  console.log("HTTP GET on /company");
  Company.GetCompany(res);
});

app.listen(5000, function () {
    console.log('CVPartnerService listening on port ' +port +'.');
});
