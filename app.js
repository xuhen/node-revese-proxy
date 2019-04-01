var http = require('http'),
    httpProxy = require('http-proxy');

var express  = require('express');
var app      = express();

var serverOne = 'http://localhost:3001',
    ServerTwo = 'http://localhost:3002',
    ServerThree = 'http://localhost:3003';

var proxy = httpProxy.createProxyServer({});

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });

    res.end('Something went wrong. And we are reporting a custom error message.');
});

app.get("/app1", function(req, res) {
    console.log('redirecting to Server1');
    proxy.web(req, res, {target: serverOne});
});
app.get("/app2", function(req, res) {
    console.log('redirecting to Server2');
    proxy.web(req, res, {target: ServerTwo});
});
app.get("/app3", function(req, res) {
    console.log('redirecting to Server3');
    proxy.web(req, res, {target: ServerThree});
});

console.log("listening on port 3000")
app.listen(3000);