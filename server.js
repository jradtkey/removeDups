const fs = require('fs');
let rawdata = fs.readFileSync('leads.json');
let leads = JSON.parse(rawdata);
var newObj = leads

function removeDups(data) {
  var test = {}
  var newTime;

  for (var i = 0; i < data.leads.length; i++) {
    if (!test.hasOwnProperty(data.leads[i]._id)) {
      test[data.leads[i]._id] = 1
    }
    // else {
    //   newTime = data.leads[i].entryDate.split("T");
    //   console.log(newTime);
    //   for (var j = 0; j < newObj.leads.length; j++) {
    //     console.log(newTime);
    //     console.log(data.leads[j].entryDate.split("T"));
    //     if (newTime[1] > data.leads[j].entryDate.split("T")) {
    //       newObj.leads.splice(j,1)
    //     }
    //   }
    // }
  }
  console.log(test);
}

removeDups(leads)
