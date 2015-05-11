function matrixDotToCoords(dot){
	var x;
	var y;
	if (dot < 5){
		x = 100;
	} else if (dot < 10) {
		x = 200;
	} else if (dot < 15) {
		x = 300;
	} else if (dot < 20) {
		x = 400;
	} else if (dot < 25) {
		x = 500;
	}
	switch(dot%5){
		case 0:
			y = 50;
			break;
		case 1:
			y = 100;
			break;
		case 2:
			y = 150;
			break;
		case 3:
			y = 200;
			break;
		default:
			y = 250;
			break;
	}
	return { 
		x: x,
		y: y};
};

function coordsToDotMatrix(x, y){
	var offset;
	var matrixIndex;
	if (x <= 125 && x >= 75){
		offset = 0;
	} else if (x <= 225 && x >= 175) {
		offset = 5;
	} else if (x <= 325 && x >= 275) {
		offset = 10;
	} else if (x <= 425 && x >= 375) {
		offset = 15;
	} else {
		offset = 20;
	}
	if (y <= 74 && y >= 30 ) {
		matrixIndex = offset;
	} else if (y <= 120 && y >= 78 ) {
		matrixIndex = offset + 1;
	} else if (y <= 170 && y >= 126 ) {
		matrixIndex = offset + 2;
	} else if (y <= 220 && y >= 176 ) {
		matrixIndex = offset + 3;
	} else if (y <= 270 && y >= 227 ) {
		matrixIndex = offset + 4;
	}
	return matrixIndex;
};

var CanvasDraw = function(controller){
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas_height = canvas.height;
	canvas_width = canvas.width;
	canvas.addEventListener("mousedown", controller.getPos, false);
}

CanvasDraw.prototype = {
	clear: function() {
		context.clearRect(0, 0, canvas_width ,canvas_height);
	},

	drawLine: function(fromx, fromy, tox, toy){
		context.fillStyle = "black"
		context.beginPath();
 		context.moveTo(fromx,fromy);
 		context.lineTo(tox, toy);
 		context.stroke();
 	},

	drawEmpty: function() {
		//Horizontal Lines
		this.drawLine(50,50, 550, 50);
		this.drawLine(50,100, 550, 100);
		this.drawLine(50,150, 550, 150);
		this.drawLine(50,200, 550, 200);
		this.drawLine(50,250, 550, 250);
		//Vertical Lines
		this.drawLine(50,50, 50, 250);
		this.drawLine(150,50, 150, 250);
		this.drawLine(250,50, 250, 250);
		this.drawLine(350,50, 350, 250);
		this.drawLine(450,50, 450, 250);
		this.drawLine(550,50, 550, 250);
	},

	drawDot: function(dot){
		var radius = 15;
		context.beginPath();
      	context.arc(dot.x, dot.y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'blue';
		context.fill();
		context.lineWidth = 5;
		context.strokeStyle = '#003300';
		context.stroke();
	},
};

var MainApp = function() {
	// 0 - 4 First Column,
	// 5- 9 Second, and so on!
	this.canvasScreen = new CanvasDraw(this);
	this.matrix = new Array(25);
	//Test code below
	for (var i;i<25;i++){
		this.matrix[i] = true;
	}
	//test code ends here!
};

MainApp.prototype = {
	getPos: function(event) {
		var x = event.x;
		var y = event.y;

		var canvas = document.getElementById("canvas");

		x -= canvas.offsetLeft;
		y -= canvas.offsetTop;

		//toggleMatrixAtPos(0);
		alert("Matrix index: " + coordsToDotMatrix(x, y));

		},
	draw: function(){
		this.canvasScreen.clear();
		this.canvasScreen.drawEmpty();
		for (var i=0;i<25;i++){
			if (this.matrix[i] = true)
				this.canvasScreen.drawDot(matrixDotToCoords(i));
		}
	},

	toggleMatrixAtPos: function(pos) {
		this.matrix[pos] = ~this.matrix[pos];
	},

};