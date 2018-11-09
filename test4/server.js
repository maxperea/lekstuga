var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(3000);
var io = socket(server);
app.use(express.static('public'));



var connections = [];
var players = [];

io.sockets.on('connection', newConnection);

function newConnection(socket){

	connections.push(socket);

	console.log('new connection ' + socket.id);
	console.log(connections.length + ' connections...');

	socket.on('newPlayerPos' function(data){
		var collide = checkCollision(data);
		if(collide)
			socket.emit('goBack', data);
		else
			updatePlayers(data);
		socket.broadcast.emit('newState',players);
	})

	socket.on('disconnect', function(){
		connections.splice(connections.indexOf(socket), 1);
		console.log('player disconnect');
		console.log(connections.length + ' connections...');
	});
}


function checkCollision(data){
	return false;
};

function updatePlayers(data){

}