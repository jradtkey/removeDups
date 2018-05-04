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


function organize_data(data, num) {
  var list = [];
  var list_of_lists = [];

  for (var key in data.Sheets.Sheet1) {
    list.push(key);
  }

  for (var i = 0; i < list.length-1; i+=num) {

    var temp_list = [];
    var j = i;
    var count = 0;
    while (count < num) {
      var name = list[j]
      var object = data.Sheets.Sheet1[name]

      var split_key = list[i].split("")
      if (typeof object == 'object') {
        temp_list.push(object.w)
      }
      count++;
      j++;
    }
    list_of_lists.push(temp_list)
  }
  return list_of_lists
}

const email_data = organize_data(workbook, length);


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jradtkey',
    pass: 'Jaredradtkey1'
  }
});


function sendEmails(data) {

  var fails = []
  var inputs = {}

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      inputs[j] = data[i][j]
    }
    
    let email = inputs[0];


    var mailOptions = {
      from: "jradtkey@gmail.com",
      to: email,
      subject: 'Hi' + ' ' + inputs[1] + '!',
      text: 'It looks like you had' + ' ' + inputs[2] + ' customers this week. WHOOOOO YAAAA' + inputs[3]
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

sendEmails(email_data)

app.listen(process.env.PORT || 8000);
// print to terminal window
console.log("Listening on 8000");
