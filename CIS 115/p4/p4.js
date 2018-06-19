/*global object x,y represent position on the sprite,
width and height are the limits of each sprite
positionX is the starting position of the draw sprite
oldPositionX and Dx help move the sprite
*/
let info = {
	canvas: null,
	context: null,
	x: -1,
	y: -1,
	width: 50,
	height: 50,
	index: 0,
	img: null,
	positionX: (800+50)/2,
	oldPositionX: 0,
	Dx: 5,
}

window.onload = () => {
	info.canvas = document.querySelector("#myCanvas");
	info.context = info.canvas.getContext("2d");

	//need an even/function to use the video players
	setInterval(playVideoOne, 0);
	setInterval(playVideoTwo, 0);
	standStill();

	//events for when key is down and up
	window.addEventListener("keydown", handleKeyDown);
	window.addEventListener("keyup", handleKeyUp)
}



handleKeyDown = (event) => {
	//console.log(event.keyCode);

	//uses oldposition and convert to a new position and erase the old img
	info.oldPositionX = info.positionX;

	//grabs video element from DOM and call it with a pause when event keydown is present
	let video = document.querySelector("#video1")
	video.pause();

	//"either" on the project so just wanted toshow one way so it's easier to see
	//the other function abilities.
	//let videoTwo = document.querySelector("#video2")
	//videoTwo.pause();

	//clears rect at a specific spot, part of the issue of the flicker
	//I assume it's because it clears the new image that would of been generated
	info.context.clearRect(0, 200, info.canvas.width, info.canvas.height-200);

	//switch statement, can use any key as long it makes sense for movement
	switch(event.keyCode) {
		//move left with left key
		case 37:
			info.positionX -= info.Dx;
			moveLeft();
			break;
		case 39:
			info.positionX += info.Dx;
			moveRight();
			break;
	}
	
}

//honestly didn't need to make a seperate function for standStill
//it was here if I wanted to try other options
handleKeyUp = () => {
	let video = document.querySelector("#video1")
	video.play();
	standStill();
}

//draws the image for standstill with given positions
standStill = () => {
	let ctx = info.context;
	let f = info;
	let img = new Image();
	ctx.clearRect(0, 200, f.canvas.width, f.canvas.height-200);
	img.onload = () => {
		//f.x and f.y, width and height help select the position from the img
		//while the res give the position on canvas
		ctx.drawImage(img, (f.x+50), f.y, f.width, f.height, 
			f.positionX, (f.canvas.height-f.height), f.width, f.height);
	}
	img.src = "Images/fox.png"
}

//draws sprite for left movement with given properties
moveLeft = () => {
	let ctx = info.context;
	let f = info;
	let img = new Image();

	//ctx.clearRect(0, 0, f.canvas.width, f.canvas.height);

	img.onload = () => {
		
		f.index++
		if (f.index > 2){
			f.x = -49;
			f.index = 0;
		}
		f.x += 48;

		ctx.drawImage(img, f.x, (f.y+46), f.width, f.height, f.positionX, (f.canvas.height-f.height), f.width, f.height);
	}
	img.src = "Images/fox.png"
}

//draws sprite for right movement
moveRight = () => {
	let ctx = info.context;
	let f = info;
	let img = new Image();

	img.onload = () => {
		f.index++
		if (f.index > 2){
			f.x = -49;
			f.index = 0;
		}
		f.x += 49;

		//(f.canvas.width+info.width)/2 when not calling the object
		ctx.drawImage(img, f.x, f.y+95, f.width, f.height, f.positionX, (f.canvas.height-f.height), f.width, f.height);
	}
	img.src = "Images/fox.png"
}

//grabs element tag video1 and draws it on the canvas
playVideoOne = () =>{
	let ctx = info.context;
	let video = document.querySelector("#video1")
	//console.log(video.currentTime)
	
	ctx.drawImage(video, 0, 0, 180, 180);
	//draws img once hitting a position
	if(info.positionX == 180){
		video.play();
	}
	//checks the current time and stops after or at 5secs
	if(video.currentTime >= 5.0){
		video.pause();
		//sets currentTime to 0 aka resets video
		video.currentTime = 0;	
	}
	//if I was suppose to continue after 5secs once hitting the position point
	//I would create another if statement and set currentTime to 5.1 for example
	//and change the above currentTime to be limit 5.1 >= CurrentTime >= 5.0
	//if pause clears it
	if(video.paused){
		ctx.clearRect(0,0, 180, 180);
	}

}

//draws video 2 on canvas
playVideoTwo = () =>{
	let ctx = info.context;
	let video = document.querySelector("#video2")
	
	ctx.drawImage(video, 620, 0, 180, 180);
	if(info.positionX == 620){
		video.play();
	}

	if(video.currentTime >= 5.0){
		video.pause();
		video.currentTime = 0;
	}
		if(video.paused){
		ctx.clearRect(620,0, 180, 180);
	}
}

//wasn't 100 sure if he video should display first and play for 5 secs
//then pause and start up again when the sprite reaches the spot