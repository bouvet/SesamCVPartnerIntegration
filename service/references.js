var request = require('request');
var token = process.env.CVPToken;
var references = [];
var url = 'https://bouvet.cvpartner.com/api/v2/company/cv/customers';