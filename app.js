var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require('express');

app.use(express.static('public'));

io.on('connection', function (socket) {
    socket.on('test', function (msg) {
        console.log('test: ' + msg);
    });


    socket.on("queue-1", function (msg) {
        io.emit("queue-1", msg);
        console.log("queue-1: " + JSON.stringify(msg))
    });

    socket.on("queue-2", function (msg) {
        io.emit("queue-2", msg);
        console.log("queue-2: " + JSON.stringify(msg))
    });

    socket.on("queue-3", function (msg) {
        io.emit("queue-3", msg);
        console.log("queue-3: " + JSON.stringify(msg))
    });

    console.log('a user connected');
});

var port = process.env.PORT || 3000;

http.listen(port, function () {
    console.log('listening on :' + port);
});


