/*
var init = function() {
	alert("test");
};

window.onload = init;
*/

/*
get reference to input box

get reference to button
add button event handler
 when  utton event handler called, get text, display in alert
 */

window.onload = function() {

	var ref = document.getElementById('inputButton');
	alert("test");
	var inputReference = document.getElementById("inputText");
	ref.addEventListener('click', handleClickEvent)
};

function handleClickEvent() {
	var inputReference = document.querySelector('#inputText')
}