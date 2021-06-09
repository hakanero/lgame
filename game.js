var gins = [[],[],[],[]];
for(var i=1;i<5;i=i+1){
    for(var j=1;j<5;j=j+1){
        gins[i-1].push(document.getElementById(`gi${i}-${j}`));
    }
}
var colors=["red","blue","green","teal","whitesmoke"];
var ind = 0;
gins.forEach(gin => {
    gin.forEach(g => {
        g.onmouseover = function(){
            i+=1;
            g.style.backgroundColor=colors[i%colors.length];
        }
        g.onmouseleave = function(){
            g.style.backgroundColor=colors[i%colors.length];
        }
    });
});