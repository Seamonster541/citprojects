class Circle {
	constructor (x, y, radius, color){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;		
	}


	//grabs the method and returns when called
	get circle(){
		return this.drawCircle();
	}

	//draws the circle
	drawCircle() {
	let ctx = info.context;
	//beginPath() and closePath() are used to insure the boundries of the drawn object doesn't "fuse" with others outside it's given limitations
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
	}
}

let info = {
	canvas: null,
	context: null,
	x: 50,
	y: 250,
	pWidth: 20,
	pHeight: 150,
	circleX: 680,
	circleY: 100,
	circleDx: 0,
	circleDy: 0,
	circleR: 13,
	misses: 0,
	color: "red",
	paddleX: 50,
	paddleY: 0,
	defaultC: "blue",
}

window.onload = function () {
	info.canvas = document.querySelector("#myCanvas");
	info.context = info.canvas.getContext("2d");

	let restartButton = document.querySelector('#restart');
	restartButton.addEventListener("click", restart);

	let startButton = document.querySelector('#start');
	startButton.addEventListener("click", start);

	info.canvas.addEventListener("mousemove", mouseMove)

	setInterval(reDraw, 30);
}

reDraw = () => {
	info.context.clearRect(0, 0, info.canvas.width, info.canvas.height);
	drawPaddle();
	drawCircle();
	missedBall();
	drawCoords();
}
mouseMove = (event) => {
	//x = event.clientX - info.canvas.offsetLeft
	info.x = info.paddleX;

	info.y = event.clientY - info.canvas.offsetTop*3/2;

	if (info.y <= info.paddleY){
		info.y = info.paddleY;
	}
	if (info.y >= info.canvas.height - info.pHeight){
		info.y = info.canvas.height - info.pHeight;
	}
}

drawPaddle = () => {

	info.context.beginPath();
	info.context.fillStyle = info.defaultC;
	info.context.fillRect(info.x, info.y, info.pWidth, info.pHeight);
	if (info.circleX <= info.pWidth+info.paddleX+info.circleR && (info.circleY >= info.y+info.circleR && info.circleY <= info.y+info.pHeight+info.circleR)){	
		info.defaultC = info.color;
	}
	info.context.closePath();
}

drawCoords = () => {
	let point = info.x + "," + info.y;
	//console.log(point);
	info.context.beginPath();
	info.context.fillStyle = "black";
	info.context.font = "20px Arial";
	let fontX = info.canvas.width / 2 - (info.context.measureText(point).width / 2);
	info.context.fillText(point, fontX, 20);
	info.context.closePath();
}

drawCircle = () => {
	let ctx = info.context;

	let circle = new Circle(info.circleX, info.circleY, info.circleR, info.color);
	circle.circle;
	//beginPath() and closePath() are used to insure the boundries of the drawn object doesn't "fuse" with others outside it's given limitations
	/*
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(info.circleX, info.circleY, info.circleR, 0, 2*Math.PI);
	ctx.fill();
	*/

	//shifting image location
	info.circleX = info.circleX + info.circleDx;
	info.circleY = info.circleY + info.circleDy;

	//bouncing
	if (info.circleX > info.canvas.width - info.circleR) {
		//info.circleX < 0 + info.circleR || 
		info.circleDx = -info.circleDx;
		info.color = "purple";
	}
	if (info.circleY < 0 + info.circleR || info.circleY > info.canvas.height - info.circleR) {
		info.circleDy = -info.circleDy;
		if (info.circleY < 0 + info.circleR)	
			info.color = "yellow";
		else
			info.color = "orange";
	}

	//bounce off paddle  x value 83
	//if (info.circleX-info.circleR >= info.pWidth && info.circleX-info.circleR <= info.pWidth+info.paddleX) && (info.circleY-info.circleR <= info.y+info.pHeight))
	if (info.circleX <= info.pWidth+info.paddleX+info.circleR && (info.circleY >= info.y+info.circleR && info.circleY<= info.y+info.pHeight+info.circleR)){
		info.circleDx = -info.circleDx;	
		//info.color = "green";
		//info.circleDy = info.circleDy;
	}
	//strangeMode();

	if (info.circleX <= 0) {
		info.color = "red"
		info.circleX = 680;
		info.circleY = 100;
		info.circleDx = -5;
		info.circleDy = 5;
		info.misses++;
	}
}

missedBall = () => {
	let ctx = info.context;
	//defines size and font;
	let message = "misses: " + info.misses;
	//displays the text filled in
	ctx.beginPath();
	ctx.font = "30px Serif"
	ctx.fillStyle = "black";
	ctx.fillText(message, info.canvas.width/2 - (ctx.measureText(message).width / 2), 50);
	ctx.closePath();
}

restart = () => {
	info.misses = 0;
	info.circleX = 680;		
	info.circleY = 100;
	info.circleDx = 0;
	info.circleDy = 0;
	info.color = "red";
	info.defaultC = "blue";
}

start = () => {
	info.circleDx = -5;
	info.circleDy = 5;
}

/*
strangeMode = () => {
	if (info.color == "green"){
		info.circleDx += 0.5;
		//console.log(info.color);
		//console.log(info.circleDx)
	}

	
	if (info.color == "purple"){
		info.circleDx = -5
		console.log(info.circleDx);
	}
}*/