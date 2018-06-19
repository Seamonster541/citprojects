let name = "alex";
let author ="";
let ISBN = "";

let temperatures = ["alex", "5554", "Tx", "US"];

alert(temp[1])
//0
let res = 0;
for (let i=0; i <=10; i++){
	//res += i*i
	ctx.fillRect(i,i,50,50);
}

function sum(a,b){
	return a+b;
}

//function expression
let sum = (a,b) => {
	return a+b;
}

let sum = (a,b) => a+b

let newFunction = (b) => { alert(b);}

function displayName(){
	let student = {
		name: "alex",
		studentID: "951...",
		...
	}
	alert("name is: " + student.name);

}

//annonymous function = no name normal vs ES6
window.onload = function(a){
	 alert(a);
}
window.onload = () => {

}
window.onload = init; //creates a variable that holds window.onload
function init(){ //function window.onload as init
	alert("done")
}

init();

function (){
	document.querySelector("#myCanvas");
}

//ways to call from html
#myCanvas; // id
.textRed; // class name
canvas; //tag name

function init(){
	let cnv = document.querySelector("#myCanvas")
	let ctx = cnv.getContext('2d');

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, canvas.width/2, canvas.height/2);

}