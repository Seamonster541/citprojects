let frameInfo = {
	W: 120,
	H: 200,
	X: 0,
	Y:0,
	index: 0,
}


window.onload = () => {

	setInterval(drawCoin, 1000);
	//drawCoin();
}

let drawCoin = () => {
	let i = frameInfo;
	let canvas = document.querySelector('#myCanvas');
	let ctx = canvas.getContext('2d');

	ctx.clearRect(0,0, canvas.width, canvas.height);

	let img = new Image();
	img.onload = () =>{
		i.index++;
		if (i.index > 5){
			i.X = 0;
			i.index = 0;
		}
		i.X += i.W;
		ctx.drawImage(img, i.X, i.Y, i.W, i.H, 20, 20, i.W, i.H);
	}
	img.src = 'coinTwo.png'
	//'robot.jpg'  //'../img/image from internet or local'
	//ctx.drawImage(img, 10, 10);
}