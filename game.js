//L Game
//code by haqan

var cells = [];
var n = 4;
var cwdt;
var chgt;

function startGame(){
	gameArea.start();
	drawCells();
}

var gameArea = {
	canvas:document.getElementById("game"),
	start:function(){
		this.canvas.width = 500;
		this.canvas.height = 500;
		cwdt = this.canvas.width/n;
		chgt = this.canvas.height/n;
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

function checkL(pos){
	if(pos.length!=4){
		return false;
	}
	let ies = pos.map(x=>x.i);
	let jes = pos.map(x=>x.i);
	let kulpi = false;
	let kulpj = false;
	let ayaki = false;
	let ayakj = false;
	for(var c=0 ; c<4 ; c++){
		let i = pos[c].i;
		let j = pos[c].j;
		switch(count(ies,i)){
			case 3:
				kulpi=true;
				break;
			case 2:
				ayaki=true;
				break;
		}
		switch(count(jes,j)){
			case 3:
				kulpj=true;
				break;
			case 2:
				ayakj=true;
				break;
		}
	}
	if(((kulpi&&ayakj)||(kulpj&&ayaki))&&(!kulpi&&!kulpj)&&(!ayaki&&!ayakj)){
		console.log("bu bir l");
	}
	else{
		console.log("bir bir l değil");
	}
}

function updateGame(){
	gameArea.clear();
	for (var i = 0;i<cells.length;i++){
		cells[i].update();
	}
}

function drawCells(){
	for(var i=0 ; i<n ; i++){
		for(var j=0 ; j<n ; j++){
			let c = new cell(`rgb(${255/(i+1)},0,${255/(j+1)})`,i,j);
			cells.push(c);
		}
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

checkL([new cell("red",0,0),new cell("red",1,0),new cell("red",0,1),new cell("red",0,2)]);

startGame();
