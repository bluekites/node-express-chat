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

// handles submission of new message
var $form = $('#message-form'); // now $form can access all jquery methods

$form.on('submit', function(e){
  e.preventDefault();
  var $message = $form.find('input[name=message]');
  
  socket.emit('message', {
    text: $message.val() // find lets us search in an element 
  });
  $message.val('');
})