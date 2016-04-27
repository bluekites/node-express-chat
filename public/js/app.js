var socket = io();
var name = getQueryVariable('name') || 'Kind Stranger';
var room = getQueryVariable('room');

//var now = _moment();

// tell when the browser connects to the server. we need to set up sockets both on front and back
// fires on connect
socket.on('connect', function(){
  console.log('Connected to socket.io server!');
});

// fires when receiving message and allows us to append to DOM
socket.on('message', function(message){
  var momentTimeStamp = moment.utc(message.timestamp);
  console.log('New message: ');
  console.log(message.text);
  $('.messages').append('<p><strong>' + momentTimeStamp.local().format('h:mm a') + ': </strong>' + message.name + ' : ' + message.text + '</p>');
  window.scrollTo(0, document.body.scrollHeight);
});

// handles submission of new message(front end talking to back)
var $form = $('#message-form'); // now $form can access all jquery methods

$form.on('submit', function(e){
  e.preventDefault();
  var $message = $form.find('input[name=message]');
  
  // this right here sends the user input to the backend for processing(sends to socket.on in backend)
  socket.emit('message', {
    name: name,
    text: $message.val(), // find lets us search in an element
  });
  $message.val('');
})