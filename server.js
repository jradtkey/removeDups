const fs = require('fs');
let rawdata = fs.readFileSync('leads.json');
var nodemailer = require('nodemailer');
let leads = JSON.parse(rawdata);


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jradtkey',
    pass: 'Jaredradtkey1'
  }
});

var emails = ['jradtkey@gmail.com', 'jradtkey@gmail.com', 'jradtkey@gmail.com', 'jradtkey@gmail.com', 'oinoinoinoinoino']
function sendEmails(emails) {

  var fails = []

  for (var i = 0; i < emails.length; i++) {

    let email = emails[i];

    var mailOptions = {
      from: "jradtkey@gmail.com",
      to: email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!' + " " + i
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

sendEmails(emails)
