var socket = io();

// tell when the browser connects to the server
socket.on('connect', function(){
  console.log('Connected to socket.io server!');
});