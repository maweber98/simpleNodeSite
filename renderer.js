const fs = require('fs');

function mergeValues(values, content) {
    for(var key in values) {
        content = content.replace('{{' + key + '}}', values[key]);
    }
    return content;

}

function view(templateName, values, response) {
    //Read from the template file
    let fileContents = fs.readFileSync('./views/' + templateName + '.html', { encoding: 'utf8' });

    fileContents = mergeValues(values, fileContents);
    response.write(fileContents); 
}

module.exports.view = view;