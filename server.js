const fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
let rawdata = fs.readFileSync('leads.json');
var nodemailer = require('nodemailer');
let leads = JSON.parse(rawdata);
if(typeof require !== 'undefined') XLSX = require('xlsx');

// var emails = require('./emails')
// var names = require('./names')
// var num_of_customers = require('./num_of_customers')

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/static"));
// app.use(session({secret: 'thisIsSecret',resave: true, saveUninitialized: true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
})



var workbook = XLSX.readFile('file.xlsx');
var cells = []
var data = []
var key_cells = []


function get_Data_From_Sheet(workbook) {
  for (var key in workbook.Sheets.Sheet1) {
    if (workbook.Sheets.Sheet1.hasOwnProperty(key)) {
      cells.push(key)
    }
  }

  for (var i = 0; i < cells.length-1; i++) {
    var name = cells[i]
    var object = workbook.Sheets.Sheet1[name]
    // console.log(object.w);
    var split_key = cells[i].split("")
    data.push(object.w)
    key_cells.push(split_key[0])
  }
}

get_Data_From_Sheet(workbook)

console.log(data);

function countUnique(list) {
  var unique = {}
  var length = 0
  for (var i = 0; i < list.length; i++) {
    if (!unique.hasOwnProperty(list[i])) {
      length++
      unique[list[i]] = 1
    }
    else {
    }
  }
  return length
}

var length = countUnique(key_cells)


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jradtkey',
    pass: 'Jaredradtkey1'
  }
});


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


for (var i = 0; i < data.length; i++) {
  for (var j = i; j < length; j++) {
    console.log(j);
    j++
    console.log(j);
    j++
    console.log(j);
  }
  i = j;
  console.log('----');
}

app.listen(process.env.PORT || 8000);
// print to terminal window
console.log("Listening on 8000");
