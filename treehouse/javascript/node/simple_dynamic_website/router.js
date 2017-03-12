var Profile = require('./profile');
var render = require('./render');
var queryString = require('querystring');

const commonHeaders = {'Content-type': 'text/html'};

function home(request, response) {
  if(request.url === '/') {
    if(request.method.toLowerCase() === 'get') {
      response.writeHead(200, commonHeaders);

      render.view('header', {}, response);
      render.view('search', {}, response);
      render.view('footer', {}, response);

      response.end();
    } else {
      request.on('data', function(postBody) {
        var query = queryString.parse(postBody.toString());
        // response.writeHead(303, {'Location':"/" + query.username});
        console.log(query);
        response.write('Получены данные: ' + query.username)
        response.end();
      })
    }
  }
}

function user(request, response) {
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);
    render.view('header', {}, response);

    var studentProfile = new Profile(username);

    studentProfile.on('end', function(profileJSON){
      //show profile

      //store the values we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        userName: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      // simpleResponse
      render.view('profile', values, response);
      render.view('footer', values, response);
      response.end();
    });

    studentProfile.on('error', function(error) {
      //show Error
      response.writeHead(200, commonHeaders);
      render.view('error', {errorMessage: error.message}, response);
      render.view('search', {}, response);
      render.view('footer', {}, response);
      response.end();
    })
  }
}

module.exports.home = home;
module.exports.user = user;
