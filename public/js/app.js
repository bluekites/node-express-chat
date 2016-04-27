var socket = io();
//var now = _moment();

// tell when the browser connects to the server. we need to set up sockets both on front and back
socket.on('connect', function(){
  console.log('Connected to socket.io server!');
});

// front end listening for the custom event message that we set up in the back
// this fires everytime a new message comes in
socket.on('message', function(message){
  var momentTimeStamp = moment.utc(message.timestamp);
  console.log('New message: ');
  console.log(message.text);
  $('.messages').append('<p><strong>' + momentTimeStamp.local().format('h:mm a') + ': </strong>' + ': ' + message.text + '</p>');
  window.scrollTo(0, document.body.scrollHeight);
});

// handles submission of new message(front end talking to back)
var $form = $('#message-form'); // now $form can access all jquery methods

$form.on('submit', function(e){
  e.preventDefault();
  var $message = $form.find('input[name=message]');
  
  socket.emit('message', {
    text: $message.val(), // find lets us search in an element
  });
  $message.val('');
})