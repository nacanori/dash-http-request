'usestrict';

const superagent = require('superagent');
const DashButton = require("dash-button");
const request = require('./config.json');
const button = new DashButton(request.address);

console.log("Stand by...");
var doubleClick = false;

button.addListener(function() {
  console.log("Detect of an amazon dash button", new Date());
  setTimeout(function() {
    doubleClick = false;
  }, 10000);

  if (!doubleClick) {
    console.log("HTTP request");
    superagent(request.method, request.url)
      .send(request.body)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        console.log("Request status", res.status);
      });
  }
  doubleClick = true;
});
