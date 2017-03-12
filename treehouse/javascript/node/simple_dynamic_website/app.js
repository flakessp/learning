var router = require('./router');
// create a web server
var http = require('http');

http.createServer(function(request, response) {
  router.home(request, response);
  router.user(request, response);
}).listen(8080);

console.log('Server running!🍿');
