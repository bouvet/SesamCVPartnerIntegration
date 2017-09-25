var express = require('express');

var app = express();
var host = "0.0.0.0";
var port = 5000;
var users = require('./users');
var customers = require('./customers');
var references = require('./references');


app.route('/users').get(function(Req, res) {
  console.log("HTTP GET on /users");
  users.GetUsers(res);
});

app.route('/customers').get(function(Req, res) {
  console.log("HTTP GET on /customers");
  customers.GetCustomers(res);
});

app.route('/references').get(function(Req, res) {
  console.log("HTTP GET on /references");
  references.GetAllReferences(res);
});

app.route('/projects').get(function(Req, res) {
  console.log("HTTP GET on /projects");
  references.GetCustomerProject(res);
});

app.listen(5000, function () {
    console.log('CVPartnerService listening on port ' + port +'.');
});
