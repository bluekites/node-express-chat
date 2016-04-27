var socket = io();

// tell when the browser connects to the server. we need to set up sockets both on front and back
socket.on('connect', function(){
  console.log('Connected to socket.io server!');
});

// front end listening for the custom event message that we set up in the back
socket.on('message', function(message){
  console.log('New message: ');
  console.log(message.text);
});

