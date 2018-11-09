const canvas = document.getElementById('spel');
const context = canvas.getContext('2d');

context.scale(8,8);

var socket;
socket = io.connect('http://localhost:3000');

var localPlayer = new Character(4);
var players = [];
players.push(localPlayer);
socket.emit('reqPos', localPlayer);
socket.emit('charData', localPlayer);


function setBackground(){
	context.fillStyle = '#202020';
	context.fillRect(0, 0, canvas.width, canvas.height);
};

function drawCharacters(chars){
	for (var i = chars.length - 1; i >= 0; i--) {
		drawCharacter(chars[i]);
	}
}

function updateCharacters(data){
	for (var i = players.length - 1; i >= 0; i--) {
		if (players[i].id === data.id) {
			players[i].pos.x = data.pos.x;
			players[i].pos.y = data.pos.y;
			return;
		}
	}
	players.push(data);
	console.log(data);
}

function sendPos(){
	socket.emit('charData', localPlayer);
}

function draw(){
	setBackground();
	drawCharacters(players);
	socket.on('charData',updateCharacters);
	socket.on('reqPos', sendPos)
}


function update(){
	draw();
	requestAnimationFrame(update);
}

function drawCharacter(char){

	context.fillStyle = char.color;
	context.fillRect(char.pos.x, char.pos.y, 5, 5);

}

function Character(id){
	this.id = id;
	this.pos = {
		x: 0,
		y: 0
	};
	this.color = "red";
}

document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		localPlayer.pos.x--;
		socket.emit('charData', localPlayer);
	} else if (event.keyCode === 39) {
		localPlayer.pos.x++;
		socket.emit('charData', localPlayer);
	} else if (event.keyCode === 40) {
		localPlayer.pos.y++;
		socket.emit('charData', localPlayer);
	} else if (event.keyCode === 38) {
		localPlayer.pos.y--;
		socket.emit('charData', localPlayer);
	}
});


update();