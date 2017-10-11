var express = require('express');

var app = express();
var host = "0.0.0.0";
var port = 5000;
var users = require('./users');
var customers = require('./customers');
var references = require('./references');
var technology = require('./technology');
var skills = require('./skills');



//Getting the skill categories listed in CV-partner with stats
app.route('/skillStat').get(function(req, res) {
  console.log("HTTP GET on /skillStat");
  skills.getSkillCategories(res);
});

//Getting the various skills listed in CV-partner
app.route('/skills').get(function(req, res) {
  console.log("HTTP GET on /skills");
  skills.getSkills(res);
});

//Getting technology categories e.g. front-end, databases etc
app.route('/tech').get(function(req, res) {
  console.log("HTTP GET on /tech");
  technology.getTechnologyCategories(res);
});

//Getting registered users in cv-partner
app.route('/users').get(function(req, res) {
  console.log("HTTP GET on /users");
  users.GetUsers(res);
});

//Getting the user's cv from cv-partner
app.route('/cv').get(function(req, res) {
  console.log("HTTP GET on /cv");
  users.GetUserCv(req, res);
});

//Getting the company's customers
app.route('/customers').get(function(req, res) {
  console.log("HTTP GET on /customers");
  customers.GetCustomers(res);
});

//Getting the company's references
app.route('/references').get(function(req, res) {
  console.log("HTTP GET on /references");
  references.GetAllReferences(res);
});

//Getting the company's projects
app.route('/projects').get(function(req, res) {
  console.log("HTTP GET on /projects");
  references.GetCustomerProject(res);
});


app.listen(5000, function () {
    console.log('CVPartnerService listening on port ' + port +'.');
});
