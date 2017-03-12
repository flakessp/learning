var fs = require('fs');
// Function that handles the reading of files and merge in values

function mergeValues(values, content) {
  for (var key in values) {
    content = content.replace('{{'+ key +'}}', values[key]);
  }
  //cycle over the keys
    //replace all {{ley}} with the value from the values object
  return content;
}

function view(templateName, values, response) {
  //read from template files
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf-8'});

  fileContents = mergeValues(values, fileContents);

  response.write(fileContents);
}

module.exports.view = view;
