// This is a Spike. We are going to serve a Simple HTML Page.
// Non-robust, Non Production capable.
// Just to test-drive the functionality of the server.
'use strict';

var http = require("http");

var server = http.createServer();

server.on("request", function(request, response){
    console.log("Received Request");

    var body = "<html><head><title>Node Spike</title></head><body><p>This is the spike.</p></body></html>";

    response.end(body);
});

server.listen(8080);

console.log("Server Started");