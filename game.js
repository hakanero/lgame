//L Game

var cells = []; //All the cells in the grid. This list is filled by the "createCells" function
var n = 4; //Number of cells in rows and columns
var cwdt; //Width of cells
var chgt; //Height of cells
var isDragging; //Is the mouse being dragged
var draggedCells = []; //The cells mouse is draged over
var playerTurn = false; //false->Player 1, true->Player 2
var colors={ //All the colors used in the game.
	bgColor:"#F5F5F5",
	p1Color:"#A4036F",
	p2Color:"#048BA8",
	d1Color:"#EFEA5A",
	d2Color:"#F29E4C"

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
		this.canvas.width = 512;
		this.canvas.height = 512;
		this.context = this.canvas.getContext("2d");
		cwdt = this.canvas.width / n; //Set the width of cells
		chgt = this.canvas.height / n; //Set the height of cells
		this.interval = setInterval(updateGame,50); //Set the framerate (20 fps)
		this.canvas.addEventListener("mousemove",e=>procIn("mmove",e)); //On mouse move
		this.canvas.addEventListener("mousedown",e=>procIn("mdown",e)); //On mouse down
		this.canvas.addEventListener("mouseup",e=>procIn("mup",e)); //On mouse up
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

//Function to check if an element is in the list
function isIn(arr,val){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==val){
			return true;
		}
	}
	return false;
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
	if(type=="mmove"){
		if(isDragging){
			var ind = Math.floor(val.offsetX/cwdt)*n+Math.floor(val.offsetY/chgt); //Current position of the mouse
			if(!isIn(draggedCells,ind)){
				if(!(isIn(Object.values(colors),cells[ind].color) &&  cells[ind].color != colors.bgColor)){
					draggedCells.push(ind);
					cells[ind].color = curDrgColor;
				}
			}
			if(draggedCells.length==4){
				if(checkL(draggedCells.map(x=>cells[x]))){
					for(var i=0;i<4;i++){
						cells[draggedCells[i]].color = curPlrColor;
					}
				}
				else{
					isDragging=false;
					for(var i=0;i<4;i++){
						cells[draggedCells[i]].color = colors.bgColor;
					}
				}
				draggedCells.length=0;
				changePlayer();
			}
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
