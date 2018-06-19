window.onload = init;

function init(){
	let cnv = document.querySelector('#myCanvas');
	let ctx = cnv.getContext('2d');
/*
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 300, 300); // (x, y, W, H)
	ctx.fillStyle = "white";
	ctx.fillRect(100, 0, 20, 300);
	ctx.fillStyle = "white";
	ctx.fillRect(0, 140, 300, 20);
	ctx.closePath();
*/
	ctx.beginPath();
	ctx.arc(150, 150, 75, 0, 2*Math.PI, false);
	ctx.fillStyle = "red"
	ctx.fill();
	ctx.closePath();
}
/* 
window.onload = function() {}
window.onload = () => {}
*/