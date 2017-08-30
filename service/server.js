var express = require('express');

var app = express();
var host = "0.0.0.0";
var port = 5000;
var users = require('./users');
var company = require('./company');
var customers = require('./customers');
var references = require('./references');
var search = require('./search');

app.route('/users').get(function(Req, res) {
  console.log("HTTP GET on /users");
  users.GetUsers(res);
});

app.route('/company').get(function(Req, res) {
  console.log("HTTP GET on /company");
  company.GetCompany(res);
});

app.route('/customers').get(function(Req, res) {
  console.log("HTTP GET on /customers");
  customers.GetCustomers(res);
});

app.route('/references').get(function(Req, res) {
  console.log("HTTP GET on /references");
  references.GetReferences(res);
});

app.route('/search').get(function(Req, res) {
  console.log("HTTP GET on /search");
  search.GetSearch(res);
});

app.listen(5000, function () {
    console.log('CVPartnerService listening on port ' +port +'.');
});
