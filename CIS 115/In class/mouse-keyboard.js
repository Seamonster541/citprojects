let info = {
	canvas: null,
	context: null,
	x: -1,
	y: -1,
};

window.onload = function() {
	info.canvas = document.querySelector('#display');
	info.context = info.canvas.document.querySelector("2d");

	info.canvas.addEventListener("mousemove", handleMouseMove);
}




function handelMouseMove(event){
	//let oldX = info.canvas.x;
	//let oldY = info.canvas.y;
	x = event.clientX - info.canvas.offsetLeft;
	y = event.clientY - info.canvas.offsetTop;
	let point = x + "," + y;

	
	info.canvas.clearRect(0, 0, info.canvas.width, info.canvas.height);
	info.context.beginPath();
	info.context.font = "20px Arial";
	let fontX = info.canvas.width / 2 - (info.context.measureText(point).width/2);
	info.context.fillText(point, fontX, 20);

	info.contex.rect(x, y, 5, 5);
	info.context.closePath();
	info.context.stroke();
}