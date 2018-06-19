//class object that creates circles and takes parameters this. references/ or can reference using those parameters
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
	let ctx = canvasObject.context;
	//beginPath() and closePath() are used to insure the boundries of the drawn object doesn't "fuse" with others outside it's given limitations
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
	ctx.closePath();
	}
}

//similar to circle but as a rectangle
class Rectangle{
	constructor(x, y, width, height, color){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	get rectangle(){
		return this.drawRectangle();
	}

	drawRectangle(){
		let ctx = canvasObject.context;
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fill();
		ctx.closePath();
	}
}

//global object that can be used for canvas in any function or object/class
let canvasObject = {
	canvas: null,
	context: null,
	img: null,
}

//array for drop down list that calls colors
let colors = ['Aqua', 'BlueViolet', 'DarkOliveGreen',
 			  'DarkRed', 'OrangeRed'];

window.onload = () => {
	//uses the global object and call the elements from html by the id and property
	canvasObject.canvas = document.querySelector("#myCanvas");
	canvasObject.context = canvasObject.canvas.getContext("2d");

	//create a new memory Image object
	canvasObject.img = new Image();

	//different buttons/drop lists with callback
	let clearButton = document.querySelector('#clearButton');
	clearButton.addEventListener("click", clear);

	let setColor = document.querySelector('#colors');
	setColor.addEventListener("change", redraw);

	let displayButton = document.querySelector('#textButton')
	displayButton.addEventListener("click", text);	
	
	//creates the color names
	colorNames();

	//calls the function redraw() to create the canvas objects and image
	redraw();
}

//function used to hold multiple functions used on the canvas and also clears it.
redraw = () => {
	canvasObject.context.clearRect(0, 0, 800, 400);
	backgroundColor();
	vehicle();
	moon();
	floor();
	for (let i=0; i <4; i++){
		flower()+i;
	}
	text();
	img();
}

//clears the canvas
clear = () => {
	canvasObject.context.clearRect(0, 0, 800, 400);
}

//grabs the names from the color array and add it to the drop down list that it grabs
colorNames = () => {
	let colorDrop = document.querySelector('#colors');

	for (let i = 0; i < colors.length; i++){
		let option = document.createElement("option");
		option.innerHTML = colors[i];
		colorDrop.appendChild(option);
	}
}

//changes background color of the canvas - there is a more simple way to doing this.
backgroundColor = () => {
	let c = document.querySelector("#myCanvas");
	let select = document.querySelector("select");
	let colorSelect = colors[select.selectedIndex - 1];
	c.style.backgroundColor = colorSelect;

}

//vehicle function that calls the global object and uses classes defines
vehicle = () => {
	let ctx = canvasObject.context;

	//wheel 1 created from class circle
	let wheelOne = new Circle(100, 350, 25, "black");
	wheelOne.circle;

	//wheel 2
	let wheelTwo = new Circle(200, 350, 25, "black");
	wheelTwo.circle;

	//body sketch of the body of the vehicle stroke(); is a line drawn while fill() fills up the object
	ctx.beginPath();
	ctx.strokeStyle = "blue";
	ctx.strokeRect(100, 275, 100,75);
	ctx.moveTo(125, 275);
	ctx.lineTo(125, 350);
	ctx.moveTo(150, 275);
	ctx.lineTo(150, 350);
	ctx.moveTo(175, 275);
	ctx.lineTo(175, 350);
	ctx.moveTo(100, 300);
	ctx.lineTo(200, 300);
	ctx.moveTo(100, 325);
	ctx.lineTo(200, 325);	
	ctx.moveTo(100, 275);
	ctx.lineTo(65, 250);
	ctx.stroke();
	ctx.closePath();

	//jet
	let jet = new Rectangle(100, 275, -40, 20, "grey");
	jet.rectangle;
	ctx.beginPath();
	ctx.strokeStyle = "orange";
	ctx.moveTo(60, 275);
	ctx.lineTo(30, 275);
	ctx.moveTo(60, 280);
	ctx.lineTo(30, 280);
	ctx.moveTo(60, 285);
	ctx.lineTo(30, 285);
	ctx.moveTo(60, 290);
	ctx.lineTo(30, 290);
	ctx.moveTo(60, 295);
	ctx.lineTo(30, 295);
	ctx.stroke();
	ctx.closePath();
}

moon = () => {
	let ctx = canvasObject.context;

	//body
	let moon = new Circle(100,90,50,"PowderBlue");
	moon.circle;

	//gentleman hat
	let hat = new Rectangle(85, 40, 30, -30, "Black");
	hat.rectangle;
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.moveTo(65, 40);
	ctx.lineTo(135, 40);
	ctx.stroke();
	ctx.closePath();

	//gentleman glasses
	ctx.beginPath();
	ctx.strokeStyle = "black";
	ctx.arc(80, 75, 10, 0, 2*Math.PI);	
	ctx.moveTo(70, 75);
	ctx.lineTo(70, 95);
	ctx.stroke();
	ctx.closePath();
}

floor = () => {
	let ctx = canvasObject.context;
	let grass = new Rectangle(0, 400, 800, -25, "limegreen");
	grass.rectangle;
}

flower = () => {
	let ctx = canvasObject.context;

	//stem
	let stem = new Rectangle(600, 375, 10, -50, "green");
	stem.rectangle;

	//head
	let border = new Circle(605,315,30,"pink");
	border.circle;

	//inner head
	let head = new Circle(605,315,20,"yellow");
	head.circle;

	//petals
	//X position
	let X = 605;
	//Y position
	let Y = 315;
	//radius
	let r = 8;
	//distance between circles from center/radius of the "invisible circle"
	let R = 25;
	//number of circles
	let petals = 6;
	//shape that supports the position
	ctx.fillRect( X-(r/2), Y- (r/2), 5 ,10);
	//makes sure distance works aka idk what this does besides add 5
	R = R + 5;
	//random petal generator
	//let petals = Math.floor(Math.random() * 10)+3;
	//for loop that creates the petals around an object
	for (let i = 0; i < petals; i++){
		//creates the circular motion around
		let xx = ( X +R *Math.cos(2 *Math.PI*i/petals));
		let yy = (Y +R*Math.sin(2*Math.PI*i/petals));
		ctx.beginPath();
		ctx.fillStyle = "teal";
		ctx.arc( xx, yy, r, 0, 2*Math.PI, false);
		ctx.fill();
		ctx.closePath();
	}

	//face
	ctx.beginPath();
	ctx.moveTo(595, 310);
	ctx.lineTo(602, 310);
	ctx.moveTo(607, 310);
	ctx.lineTo(614, 310);
	ctx.moveTo(598, 320);
	ctx.lineTo(611, 320);
	ctx.strokeStyle = "black";
	ctx.stroke();
	ctx.closePath();
}

//uses the element from html to display text on the canvas
text = () => {
	//html elment reference it's value that user input
	let inputText = document.querySelector('#inputBox').value;
	let ctx = canvasObject.context;
	//defines size and font
	ctx.font = "40px Serif";
	//displays the text filled in
	ctx.fillText(inputText, 550, 100);
}

//img generator
img = () => {	
	//must call an onload function to load the img from new
	canvasObject.img.onload = function() {
		let ctx = canvasObject.context;
       	ctx.beginPath();
       	// img, x ,y ,width, height
		ctx.drawImage(canvasObject.img, 300, 25, 250, 250);
		ctx.closePath();

	};
	
	//links the img on java from a folder
	canvasObject.img.src = "images/catzilla.png";
}

