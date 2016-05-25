/*app.listen vs creating the server via http module is essentially the same since app.listen basically uses the http module to create a server for you, 
but creating the http server yourself through the http module allows you to reuse the http server, such as in your case, where you want to run socket.io 
with the same http server instance as the one routing web requests*/

var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app); // this is a node server that uses express as the boiler plate
var io = require('socket.io')(http); // socket! pass our server as a parameter to it
var moment = require('moment');
var now = moment();

// use express static to expose a folder
app.use(express.static(__dirname + '/public'));

var clientInfo = {}; // key is the socket room ID and the value will be an object with the user's name and user's room

// we can do cool stuff inside of this callback. THIS IS IMPORTANT
// fires on connection with the front end and passes the socket argument for various functionality
io.on('connection', function(socket){
  console.log('User connected via io!');
  // socket.emit will let us initialize our message object
  socket.emit('message', {
    name: 'System Message',
    text: 'Welcome to the chat application!',
    timestamp: moment().valueOf() // add timestamp
  });
  
  // system disconnect event
  socket.on('disconnect', function(){
    // if user is a part of the chatroom
    if (typeof clientInfo[socket.id] !== 'undefined') {
      socket.leave(clientInfo[socket.id]);
      io.to(clientInfo[socket.id].room).emit('message', {
        name: 'System Message',
        text: clientInfo[socket.id].name + ' has left the room.',
        timestamp: moment().valueOf()
      });
      delete clientInfo[socket.id];
    }
  });
  
  // this right here uses socket.join to allow for joining of rooms
  socket.on('joinRoom', function(req){
    clientInfo[socket.id] = req; // set the socket unique identifier to the request object
    socket.join(req.room);
    socket.broadcast.to(req.room).emit('message', {
      name: 'System Message',
      text: req.name + ' has joined the room!',
      timestamp: moment().valueOf()
    }); //broadcast a message to the specific room
    console.log(req.name + ' has joined ' + req.room + '!');
  });
  
  // receives message data from frontend
  // this listens for incoming messages. it will first log onto the console and then emit it to everyone else.
  socket.on('message', function(message){
    console.log(' Message received: ' + message.text);
    
    message.timestamp = moment().valueOf(); // add timestamp
    // io.emit sends to everyone including sender
    io.to(clientInfo[socket.id].room).emit('message', message); // change from io.emit to io.to(clientInfo[socket.id].room)
    // socket.boardcast.emit sends to everyone except sender
    // socket.broadcast.emit('message', message);
  });
  
}); // lets us listen for events. it means 'io on the connection event, when it happens we want to run function'

http.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});
