var https = require('https');
var http = require('http');

//print out messages
function printMessage(username, badgeCount, count) {
  var message = username + ' has ' + badgeCount + ' total badges and ' + count + ' points in Javascript';
  console.log(message);
}

function printError(error) {
  console.error(error.message);
}

function get(username) {
  var request = https.get('https://teamtreehouse.com/'+ username +'.json', function(response) {
    // console.dir(response.statusCode);
    var body = '';
    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      if(response.statusCode == 200) {
        try {
          // parse data
          var profile = JSON.parse(body);
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //parse error
          printError(error);
        }
      } else {
        //statusCode error
        printError({message: ' There was an error getting profile for ' + username + '. (' + http.STATUS_CODES[response.statusCode] + ') - ' + response.statusCode});
      }
    })
  });
}


module.exports.get = get;
