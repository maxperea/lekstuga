const canvas = document.getElementById('spel');
const context = canvas.getContext('2d');

context.scale(8,8);

var socket;
socket = io.connect('http://localhost:3000');

var localPlayer = new Character();

function draw(){
	setBackground();
	drawCharacter(localPlayer);
}

function setBackground(){
	context.fillStyle = '#202020';
	context.fillRect(0, 0, canvas.width, canvas.height);
};

function update(){
	draw();
	requestAnimationFrame(update);
}

function drawCharacter(char){
	context.fillStyle = char.color;
	context.fillRect(char.pos.x, char.pos.y, 5, 5);
}

function Character(){
	this.pos = {
		x: 0,
		y: 0
	};
	this.color = "red";
}
function updatePlayerPos(){
	socket.emit("newPlayerPos", localPlayer);
}

document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		localPlayer.pos.x--;
	} else if (event.keyCode === 39) {
		localPlayer.pos.x++;
	} else if (event.keyCode === 40) {
		localPlayer.pos.y++;
	} else if (event.keyCode === 38) {
		localPlayer.pos.y--;
	}
});


update();