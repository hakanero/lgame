//L Game
//code by haqan

var cells = [];
var n = 4;
var cwdt;
var chgt;
var isDragging;
var draggedCells = [];

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
		this.context = this.canvas.getContext("2d");
		cwdt = this.canvas.width / n;
		chgt = this.canvas.height / n;
		this.interval = setInterval(updateGame,20);
		this.canvas.addEventListener("mousemove",e=>procIn("mmove",e));
		this.canvas.addEventListener("mousedown",e=>procIn("mdown",e));
		this.canvas.addEventListener("mouseup",e=>procIn("mup",e));
	},
	clear:function(){
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
}

function cell(color,i,j){
	this.color = color;
	this.i = i;
	this.j = j;
	this.update = function(){
		ctx = gameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(i*cwdt,j*chgt,cwdt,chgt);
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
		return true;
	}else{
		return false;
	}
}

function isIn(arr,val){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==val){
			return true;
		}
	}
	return false;
}

function procIn(type,val){
	if(type=="mmove"){
		if(isDragging){
			var ind = Math.floor(val.offsetX/cwdt)*n+Math.floor(val.offsetY/chgt);
			if(!isIn(draggedCells,ind)){
				draggedCells.push(ind);
			}
			if(draggedCells.length==4){
				if(checkL(draggedCells.map(x=>cells[x]))){
					for(var i=0;i<4;i++){
						cells[draggedCells[i]].color = "green";
					}
				}
				draggedCells=[];
			}
			cells[ind].color = "red";
		}
	}
	if(type=="mdown"){
		isDragging=true;
	}
	if(type=="mup"){
		isDragging=false;
	}
}

startGame();
