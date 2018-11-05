var socket;

function setup(){
	createCanvas(640, 480);
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
	ellipse(mouseX, mouseY, 40, 40);
}

function draw(){

	socket.on('updateMouse', updateDraw)

	function updateDraw(data){

		noStroke();
		fill(255, 0, 100);
		ellipse(data.x, data.y, 40, 40);

	}
}