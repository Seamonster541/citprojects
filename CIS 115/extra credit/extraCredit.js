//First step was to make html and draw a canvas
//start building things step by step to make sure they work
//next step was to produce a circle
//clear canvas function
//make a global object that can hold the canvas and circle
//after to make a setinterval function with that clears the circle
//next step draw a circle at random x,y position and have it on a different
//set interval.
//make class and implement previous code into it
//create the methods that use the constuctor
//make a single setInterval when everything works correctly
//combine correct code for efficiency
//finish


// teammates - heather, aidan, dylan (didn't get their last names). (simon -me)

//last step i had issues with making an object with an array object for circles
//I assume first it was new circle objects, but could not produce random results
//(x,y positions) after canvas was cleared.

//class
class Circle {

	//constructor doesn't need to take augments since values produced
	constructor() {
		//limits the x and y to canvas borders
		this.x = Math.floor(Math.random() * (750 - 50) + 50);
		this.y = Math.floor(Math.random() * (350 - 50) + 50);
		this.radius = 50;
	}

	//return drawCircle function
	get circle() {
		return this.drawCircle();
	}

	//draws the circle, I could of put redraw in one here but couldn't figure it out
	drawCircle() {
		//circleInfo.context.clearRect(0, 0, 800, 400);
		let ctx = circleInfo.context;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.stroke();
		ctx.closePath();
	}
}

//global object, had issues on how to develope the array object
let circleInfo = {
	canvas: null,
	context: null,
	//circleArray: [new Circle, new Circle, new Circle]
}

window.onload = () => {
	circleInfo.canvas = document.querySelector("#myCanvas");
	circleInfo.context = circleInfo.canvas.getContext("2d");

	setInterval(redraw, 3000);

	//test subjects
	//setInterval(drawCircleTwo, 3000);
	//setInterval(drawCircle, 1000);
	//console.log()
}

//draw the shape
redraw = () => {
	//clear the canvas first
	circleInfo.context.clearRect(0, 0, 800, 400);
	
	//creates new objects the calls it's functon circle
	
	let circleA = new Circle;
	circleA.circle;
	let circleB = new Circle;
	circleB.circle;
	let circleC = new Circle;
	circleC.circle

}

/*
this code runs through the array object, it worked but wouldn't create
new circles when canvas redrew, kept giving the old values
this meant it was predefined inside the array and couldn't be change after
initally set.
drawCircleTwo = () => {
	for (let i = 0; i < circleInfo.circleArray.length; i++){
		circleInfo.circleArray[i].circle;
	}
}*/

/*
//code to produce circle at random positions
drawCircle = () => {
	limitX = Math.floor(Math.random() * (600 - 100) + 100);
	limitY = Math.floor(Math.random() * (300 - 100) + 100);
	let ctx = circleInfo.context;
	ctx.beginPath();
	ctx.arc(limitX, limitY, 50, 0, 2*Math.PI);
	ctx.stroke();
	ctx.closePath();
}
*/