var socket;

function setup(){
	createCanvas(800, 600);
	background(51);

	socket = io.connect('http://localhost:3000')
}

function mouseDragged(){
	console.log(mouseX + ', ' + mouseY);

	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse', data);

	noStroke();
	fill(255);
	ellipse(mouseX, mouseY, 25, 25);
}

function draw(){

	socket.on('updateMouse', updateDraw)

	function updateDraw(data){

		noStroke();
		fill(255, 0, 100);
		ellipse(data.x, data.y, 25, 25);

	}
}