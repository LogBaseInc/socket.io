var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  //res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket){

  // test event
  socket.on('test', function(msg){
    console.log('val: ' + msg);
  });

  // emit the increment for rotation
  io.emit("rot-y", 0.1);

  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

