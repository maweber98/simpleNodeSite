const router = require('./router.js');
// Import the Node.js http module 
const http = require('http'); 

// req is the request object which is 
// coming from the client side 
// res is the response object which is going 
// to client as response from the server 

// Create a server object 
http.createServer(function (request, response) { 
    router.home(request, response);
    router.user(request, response);

}).listen(8081); // Server object listens on port 8081 

console.log('Node.js web server at port 8081 is running..') 

