var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var http = require('http').Server(app); // this is a node server that uses express as the boiler plate

// use express static to expose a folder
app.use(express.static(__dirname + '/public'));

http.listen(PORT, function(){
  console.log('Server started on port ' + PORT);
});
