
window.onload = function(){
	/*uses setInterval(function, miliseconds) 
	for the time and date*/
	setInterval(timeDate, 500);
	
	//calls the function to show a quote at the start
	generateQuoAut();

	/*Similar to timedate this generates quotes and author
	every 5 seconds*/
	setInterval(generateQuoAut, 5000);
}

function timeDate(){
	//creates an variable that stores the Qselector
	var timeTag = document.querySelector('#date')

	/*uses the variable create and pulls innhtml file
	and reference and have it show date using the
	date() function while using toLcaleString to present
	in different format */
	timeTag.innerHTML = new Date().toLocaleString();
}

function generateQuoAut(){
	//index min and max of the array
	var min = 0;
	var max = 4;

	var quotes = ['"Life is 10% what happens to you ' +
	'and 90% how you react to it."', '"The best preparation' +
	' for tomorrow is doing your best today."',
	'"Believe you can and you are halfway there."',
	'"The journey of a thousand miles begins with one step"',
	'"Our greatest weakness lies in giving up.' + 
	' The most certain way to succeed is always to try ' +
	'just one more time."']

	var authors = ["Charles R. Swindol", "H. Jackson Brown, Jr.",
	"Theodore Roosevelt", "Lao Tzu", "Thomas A. Edison"]

	//creates random index for the two arrays
	var randIndex = randomInt(min, quotes.length - 1);

	//calls the two arrays with the same index and presents it
	document.querySelector('#quotes').innerHTML = quotes[randIndex];
	document.querySelector('#authors').innerHTML = authors[randIndex];
}

//generates random numbers for the index of the array
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}