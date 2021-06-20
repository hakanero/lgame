//L Game

var cells = []; //All the cells in the grid. This list is filled by the "createCells" function
var n = 4; //Number of cells in rows and columns
var cwdt; //Width of cells
var chgt; //Height of cells
var isDragging; //Is the mouse being dragged
var draggedCells = []; //The cells mouse is dragged over
var playerTurn = false; //false->Player 1, true->Player 2
var canvasSizeConst = 512/1366;
var canvasRect;
var bodyRect;

var colors={ //All the colors used in the game.
	bgColor:"#DAD6D6",
	p1Color:"#92BFB1",
	p2Color:"#F4AC45",
	d1Color:"#BFD9D1",
	d2Color:"#F9D49F",

};
var curPlrColor = colors.p1Color; //The current player color
var curDrgColor = colors.d1Color; //The current color of the cells which are dragged over.

//Start the Game. Runs once
function startGame(){
	createCells();
	gameArea.start();
}

//Updates the game area. Runs every frame
function updateGame(){
	gameArea.clear();
	drawCells();
}

//Game Area
var gameArea = {	
	canvas:document.getElementById("game"), //Canvas element
	start:function(){ //This function will set the game area, creating necessary variables etc.
		bodyRect = document.body.getBoundingClientRect;
		this.canvas.width = canvasSizeConst * bodyRect.width;
		this.canvas.height = this.canvas.width;
		this.context = this.canvas.getContext("2d");
		cwdt = this.canvas.width / n; //Set the width of cells
		chgt = this.canvas.height / n; //Set the height of cells
		canvasRect = this.canvas.getBoundingClientRect();
		this.interval = setInterval(updateGame,50); //Set the framerate (20 fps)
		this.canvas.addEventListener("mousemove",e=>procIn("mmove",e)); //On mouse move
		this.canvas.addEventListener("mousedown",e=>procIn("mdown",e)); //On mouse down
		this.canvas.addEventListener("mouseup",e=>procIn("mup",e)); //On mouse up
		this.canvas.addEventListener("touchmove",e=>procIn("tmove",e)); //On touch move
		this.canvas.addEventListener("touchstart",e=>procIn("tdown",e)); //On touch down
		this.canvas.addEventListener("touchend",e=>procIn("tup",e)); //On touch up
	},
	clear:function(){ //This function will clear the game area
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
	}
}

//Cell object. Represents a square in the grid.
function cell(color,i,j){
	this.color = color;
	this.i = i; //x coordinate in the grid
	this.j = j; //y coordinate in the grid
	this.update = function(){ //Draws the cell in the canvas
		ctx = gameArea.context;
		ctx.fillStyle = this.color;
		ctx.fillRect(i*cwdt,j*chgt,cwdt,chgt);
	}
}

//Creates the cells of the grid and adds them to the "cells" list
function createCells(){
	for(var i=0 ; i<n ; i++){
		for(var j=0 ; j<n ; j++){
			cells.push(new cell(colors.bgColor,i,j));
		}
	}
}

//Update every cell in the grid
function drawCells(){
	for (var i = 0;i<cells.length;i++){
		cells[i].update();
	}
}

//Refresh variables when screen size changes
function resize(){
	bodyRect = document.body.getBoundingClientRect();
	canvasSizeConst = (document.documentElement.clientWidth>document.documentElement.clientHeight) ? (512/1366) : (512/612);
	gameArea.canvas.width = canvasSizeConst * bodyRect.width;
	gameArea.canvas.height = gameArea.canvas.width;
	cwdt = gameArea.canvas.width / n;
	chgt = gameArea.canvas.height / n;
	canvasRect = gameArea.canvas.getBoundingClientRect();
}

//function to count the number of an element in a list
function count(arr,thing){
	var c = 0;
	for(var i=0;i<arr.length;i++){
		if(arr[i] == thing){
			c++;
		}
	}
	return c;
}

//Function to check if the given cells make an L shape
function checkL(pos){
	if(pos.length!=4){return false;}
	var rows = [0,0,0,0];
	var cols = [0,0,0,0];
	var minrow=mincol=3,maxrow=maxcol=0;
	for(var c=0;c<4;c++){
		var i=pos[c].i,j=pos[c].j;
		rows[i]++;
		cols[j]++;
		minrow = Math.min(minrow,i);
		maxrow = Math.max(maxrow,i);
		mincol = Math.min(mincol,j);
		maxcol = Math.max(maxcol,j);
	}
	return (isIn(rows,3) && (cols[mincol] == 2 || cols[maxcol] == 2)) || (isIn(cols,3) && (rows[minrow] == 2 || rows[maxrow] == 2));
}

//Function to check if an element is in the list
function isIn(arr,val){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==val){
			return true;
		}
	}
	return false;
}

//Function to find sum of all elements in a list
function sum(arr){
	var res = 0;
	for(var i=0;i<arr.length;i++){
		res=res+arr[i];
	}
	return res;
}

//Change the current player
function changePlayer(){
	if(playerTurn){
		curPlrColor = colors.p1Color;
		curDrgColor = colors.d1Color;
	}
	else{
		curPlrColor = colors.p2Color;
		curDrgColor = colors.d2Color;
	}
	playerTurn = !playerTurn;

}

//Function to process input
function procIn(type,val){
	if(type=="tmove"){
		type="mmove";
		console.log(val);
		val.preventDefault();
		val.offsetX = val.touches[0].clientX - canvasRect.left;
		val.offsetY = val.touches[0].clientY - canvasRect.top;
	}
	if(type=="mmove"){
		if(isDragging&&val.offsetX>=0&&val.offsetY>=0){
			var ind = Math.floor(val.offsetX/cwdt)*n+Math.floor(val.offsetY/chgt); //Current position of the mouse	
			if(!isIn(draggedCells,ind)){
				if(!(isIn(Object.values(colors),cells[ind].color) &&  cells[ind].color != colors.bgColor)){
					if(isAdjacent(cells[draggedCells[draggedCells.length-1]],cells[ind])||draggedCells.length==0){
						draggedCells.push(ind);
						cells[ind].color = curDrgColor;
					}
				}
			}
			if(draggedCells.length==4){
				if(checkL(draggedCells.map(x=>cells[x]))){
					for(var i=0;i<4;i++){
						cells[draggedCells[i]].color = curPlrColor;
					}
				}
				else{
					stopDrag();
				}
				draggedCells.length=0;
				changePlayer();
			}
		}
	}
	if(type=="mdown"||type=="tdown"){
		isDragging=true;
	}
	if(type=="mup"||type=="tup"){
		stopDrag();
	}
}

function isAdjacent(cell1,cell2){
	if(cell1===undefined || cell2===undefined){return false;}
	return isIn([-1,1],cell1.i-cell2.i)!=isIn([-1,1],cell1.j-cell2.j);
}

function stopDrag(){
	isDragging = false;
	for(var i=0;i<draggedCells.length;i++){
		cells[draggedCells[i]].color = colors.bgColor;
	}
	draggedCells.length=0;
}

startGame();
