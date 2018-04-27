const fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
let rawdata = fs.readFileSync('leads.json');
var nodemailer = require('nodemailer');
let leads = JSON.parse(rawdata);
var emails = require('./emails')
var names = require('./names')
var num_of_customers = require('./num_of_customers')


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jradtkey',
    pass: 'Jaredradtkey1'
  }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
// app.use(session({secret: 'thisIsSecret',resave: true, saveUninitialized: true}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
})

if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('file.xlsx');

// console.log(workbook.Sheets.Sheet1);
for (var key in workbook.Sheets.Sheet1) {
  if (workbook.Sheets.Sheet1.hasOwnProperty(key)) {
    console.log(key['t']);
  }
}


function sendEmails(emails, names, num_of_customers) {

  var fails = []

  for (var i = 0; i < emails.length; i++) {

    let email = emails[i];

    var mailOptions = {
      from: "jradtkey@gmail.com",
      to: email,
      subject: 'Hi' + ' ' + names[i] + '!',
      text: 'It looks like you had' + ' ' + num_of_customers[i] + ' customers this week.'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        fails.push(email);
        console.log(fails);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}

// sendEmails(emails, names, num_of_customers)

app.listen(process.env.PORT || 8000);
// print to terminal window
console.log("Listening on 8000");
