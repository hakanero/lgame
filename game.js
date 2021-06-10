var gins = [[],[],[],[]];
for(var i=1;i<5;i=i+1){
    for(var j=1;j<5;j=j+1){
        gins[i-1].push(document.getElementById(`gi${i}-${j}`));
    }
}
gins.forEach(gin => {
    gin.forEach(g => {
        g.onmouseover = function(){
            let col = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
            g.style.backgroundColor=col;
        }
        g.onmousedown = function(){
            g.innerHTML = "clicked";
        }
    });
});