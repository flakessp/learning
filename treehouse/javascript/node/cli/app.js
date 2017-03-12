var profile = require('./profile.js');
//first two args in process is process itself second is the path
var users = process.argv.slice(2);
users.forEach(profile.get);
// profile.get('sergeipanfilov');
