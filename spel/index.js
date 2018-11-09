const canvas = document.getElementById('spel');
const context = canvas.getContext('2d');
context.scale(8,8);

context.fillStyle = '#202020';
context.fillRect(0, 0, canvas.width, canvas.height);

function draw(){
	context.fillStyle = '#202020';
	context.fillRect(0, 0, canvas.width, canvas.height);

	char.draw();
}


function update(time = 0){
	draw();
	requestAnimationFrame(update);
}

function Character(){
	this.pos = {
		x: 0,
		y: 0
	};

	this.draw = function(){
		context.fillStyle = 'yellow';
		context.fillRect(this.pos.x, this.pos.y, 5, 5);
	};
}


document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		char.pos.x--;
	} else if (event.keyCode === 39) {
		char.pos.x++;
	} else if (event.keyCode === 40) {
		char.pos.y++;
	} else if (event.keyCode === 38) {
		char.pos.y--;
	}
});

var char = new Character();
	
update();