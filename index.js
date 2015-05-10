var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/view.html');
  //res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){
  socket.on('test', function(msg){
    console.log('test: ' + msg);
  });

  socket.on('motion', function(msg){
      io.emit('motion', msg);
      console.log("Motion: " + JSON.stringify(msg))
      console.log("Motion event sent");
  });

    socket.on('car_state', function(msg){
        io.emit('car_state', msg);
        console.log("car_state: " + JSON.stringify(msg))
    });
  console.log('a user connected');

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


