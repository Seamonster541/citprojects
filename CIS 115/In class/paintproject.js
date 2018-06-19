



window.onload = function() {
	info.canvas = document.querySelector("#display");
	info.context = info.canvas.getContext("2d");

	for (let i = 0; i < info.numCircle; i++){
		let radius = getRandomInteger(5, 20);
		let x = getRandomInteger(0 + radius, info.canvas.width - radius);
		let y = getRandomInteger(0 + radius, info.canvas.height - radius);
		let dx = getRandomInteger(1, 5);
		let dy = getRandomInteger(1, 5);
		let dxDir = getRandomInteger(0, 1);
		let dyDir = getRandomInteger(0, 1);
		if (dxDir == 0) dx *= -1;
		if (dyDir == 0) dy *= -1;

		info.circles.push(new Circle(x, y, radius, dx, dy));
	}
	setInterval(redraw, 20);
};

function redraw() {
	//animation loop
	//clear canvas
	info.context.clearRect(0, 0, info.canvas.width, info.canvas.height);
	// iterate through info.circles, drawing each circle based on object
	for (let i=0; i < info.circles.length; i++){
		let x = info.circles[i].x;
		let y = info.circles[i].y;
		let r = info.circles[i].radius;
		x += dx;
		info.circles[i].x = x;
		y += dy;
		info.circles[i].y = y;
		info.context.beginPath();
		info.context.arc(x, y, r, 0, Math.PI * 2);
		info.context.closePath();
		info.context.stroke();
		console.log('${x}, ${y}')
	}
}

function getRandomInteger(){

}