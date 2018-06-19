/*function init(){
	var x = 0;
	var numberOfBooks = 0;
	alert(numberOfBooks);


	//alert(x);
	//console.log(x)
	setInterval(simpleLog, 2000)
	//var Nums = new Array();
	//Nums = [1,2,3,4,5,6]
	var Numbers = [1,2,3,4,5,6];
	var Numbers2 = [6,5,4,3,2,1];

	var qTag = document.querySelector('#MyHeading')
	var randomIndex = Math.floor(Math.random() * Numbers.length);
	qTag.innerHTML = Numbers[randomIndex] + " - by: " + Numbers2[randomIndex]
	//for (var i = 0; i <Numbers.length; i++){
		//qTag.innerHTML = qTag.innerHTML + Numbers[i]
	//	qTag.innerHTML += Numbers[i]
	//}

	//The lat item of te arry
	alert(Numbers[Numbers.length-1]);

	//Second approach
	//for (var i = Numbers.length -1; i >= 0; i--){
	//	Numbers[i]
	//}

}

function simpleLog(){
	var timeTag = document.querySelector('#redTitle')
	//var timeTage = document.getElementbyID('MyHeading')
	timeTag.innerHTML = new Date().toLocaleString();
	//console.log(new Date().toLocaleString());

}
*/
window.onload = init;



function init() {
	//getting a ref to html tag
	var btn = document.querySelector("#btnSubmit")

	btn.addEventListener("click", calculator);
	//same as before but only callsone function
	//btn.onclick = getData;

	var btn2 = document.querySelector('#answer')
	btn2.addEventListener("click", calculator)

	var btn3 = document.querySelector('#btnNewElm')
	btn3.addEventListener("click", createTag)

}

/*function getData(){
	var inp = document.querySelector("#inpUser")
	alert(inp.value);
}*/

function calculator(){
	var aug1 = document.querySelector("#aug1")
	var aug2 = document.querySelector("#aug2")
	var ans = document.querySelector("#answer")
	ans.value = parseInt(aug1.value) + parseInt(aug2.value);
}

function createTag() {
	var h1 = document.createElement("h1");
	h1.innerHTML = "This is added just now!!";
	var container = document.querySelector("#container")
	container.appendChild(h1);
}