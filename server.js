const fs = require('fs');
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

sendEmails(emails, names, num_of_customers)
