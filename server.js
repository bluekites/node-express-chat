var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app); // this is a node server that uses express as the boiler plate
var io = require('socket.io')(http); // socket! pass our server as a parameter to it

// use express static to expose a folder
app.use(express.static(__dirname + '/public'));

io.on('connection', function(){
  console.log('User connected via io!');
}); // lets us listen for events. it means 'io on the connection event, when it happens we want to run function'

http.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});
