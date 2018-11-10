var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000);

var io = socket(server);

app.use(express.static('public'));

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection ' + socket.id);

  socket.on('charData', charMsg);
  socket.on('reqPos', requestPos);

  function charMsg(data){
    console.log(data);
    data.id = socket.id;
    socket.broadcast.emit('charData', data);
  }

  function requestPos(data){
    socket.broadcast.emit('reqPos', data);
  }

  socket.on('disconnect', function(){
    socket.broadcast.emit('dc');
    console.log('player discconect');
  });
}