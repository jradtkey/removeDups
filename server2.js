var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
var fs = require('fs');
var port = 8080;
var cheerio = require('cheerio')


var url = "https://www.indeed.com/cmp/Downtown-Wholesalers/jobs/Operation-Manager-72ea7ee6504db73f?sjdu=QwrRXKrqZ3CNX5W-O9jEvcOk4YMNjXHuyK2x3bhmH7bJuVV5TEFcPr_JvofER43gdcn3r9tR3kQpxaBc0DFStg&tk=1cbika25s1d2v5it&vjs=3"

request(url, function (err, resp, body) {
  var $ = cheerio.load(body);
  var companyName = $('.location');
  var companyNameText = companyName.text();
  console.log(companyNameText);
})

app.listen(port);
console.log('server running on' + " " + port);
