var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app); // this is a node server that uses express as the boiler plate
var io = require('socket.io')(http); // socket! pass our server as a parameter to it

// use express static to expose a folder
app.use(express.static(__dirname + '/public'));

// we can do cool stuff inside of this callback
io.on('connection', function(socket){
  console.log('User connected via io!');
  // we will reference the socket object and call emit but need front end to listen
  socket.emit('message', {
    text: 'Welcome to the chat application!'
  });
  
  socket.on('message', function(message){
    console.log('Message received: ' + message.text);
    
    // io.emit sends to everyone including sender
    // socket.boardcast.emit sends to everyone except sender
    socket.broadcast.emit('message', message);
  });
  
}); // lets us listen for events. it means 'io on the connection event, when it happens we want to run function'

http.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});
