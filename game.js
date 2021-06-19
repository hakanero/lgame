//L Game
//code by haqan

var cells = [];
var n = 4;
var cwdt;
var chgt;

function startGame(){
	createCells();
	gameArea.start();
}

function updateGame(){
	gameArea.clear();
	drawCells();
}

var gameArea = {	
	canvas:document.getElementById("game"),
	start:function(){
		this.canvas.width = 512;
		this.canvas.height = 512;
		wdt = this.canvas.width/n;
		chgt = this.canvas.height;
		this.context=this.canvas.getContext("2d");
		this.interval = setInterval(updateGame,20);
	},
	clear:function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
}

function cell(color,i,j){
	this.i = i;
	this.j = j;
	this.x = i*cwdt;
	this.y = j*chgt;
	this.update = function(){
		ctx = gameArea.context;
		ctx.fillStyle = color;
		ctx.fillRect(this.x,this.y,cwdt,chgt);
	}
}

function createCells(){
	for(var i=0 ; i<n ; i++){
		for(var j=0 ; j<n ; j++){
			cells.push(new cell(`rgb(${255/(i+1)},0,${255/(j+1)})`,i,j));
		}
	}
}

function drawCells(){
	for (var i = 0;i<cells.length;i++){
		cells[i].update();
	}
}

function count(arr,thing){
	var c = 0;
	for(var i=0;i<arr.length;i++){
		if(arr[i] == thing){
			c++;
		}
	}
	return c;
}

function checkL(pos){
	if(pos.length!=4){
		return false;
	}
	var ies = pos.map(x=>x.i);
	var jes = pos.map(x=>x.j);
	var cnt = 0;
	for(var c=0;c<4;c++){
		var i=pos[c].i;
		var j=pos[c].j;
		cnt = cnt + count(ies,i) + count(jes,j);
	}
	if(cnt==16){
		console.log("bu bir l");
	}else{
		console.log("bu bir l değil");
	}
}

function procIn(mousepos){
	console.log(mousepos);
}

startGame();
