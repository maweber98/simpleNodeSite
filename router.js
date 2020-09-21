const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const querystring = require('querystring');
const commonHeader = { 'Content-Type': 'text/html' }

const { builtinModules } = require("module");

function home(request, response) {
    if(request.url === '/') {
        if(request.method.toLowerCase() === 'get'){
            response.writeHead(200, commonHeader);
            renderer.view('header', {}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        } else {
            request.on('data', function(postBody) {
                const query = querystring.parse(postBody.toString());
                response.writeHead(303, { 'Location':'/' + query.username });
                response.end();
            })
        }
    }
}

function user(request, response) {
    
    const username = request.url.replace('/', '');
    if(username.length > 0) {
        response.writeHead(200, commonHeader);
        renderer.view('header', {}, response);

        var studentProfile = new Profile(username);

        studentProfile.on("end", function(profileJSON){

            const values = {
                avatarURL: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }

            renderer.view('profile', values, response);            
            renderer.view('footer', {}, response);
            response.end();
        });

        studentProfile.on("error", function(error){
            renderer.view('error', {errorMessage: error.message}, response);
            renderer.view('search', {}, response);
            renderer.view('footer', {}, response);
            response.end();
        });

    }
}

module.exports.home = home;
module.exports.user = user;