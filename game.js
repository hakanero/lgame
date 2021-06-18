var gamePiece;
var mousePos = {x:0,y:0};
function startGame(){
	gameArea.start();
	gamePiece = new cell(30,30,"red",10,120);
}
var gameArea = {
	canvas:document.getElementById("game"),
	start:function(){
		this.context=this.canvas.getContext("2d");
	this.interval = setInterval(updateGame,20);
	window.addEventListener("mousemove",function(e){
		mousePos.x = e.pageX;
		mousePos.y = e.pageY;
	})
	},
	clear:function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
}
function cell(width,height,color,x,y){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.update = function(){
		ctx = gameArea.context;
		ctx.fillStyle=color;
		ctx.fillRect(this.x,this.y,this.width,this.height);
	}
}
function updateGame(){
	gameArea.clear();
	gamePiece.x = mousePos.x;
	gamePiece.y = mousePos.y;
	gamePiece.update();
}
startGame();
