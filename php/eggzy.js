var canvas,stage,queue,egg;
var nestArr = [];
var initialXPosition,initialYPosition;
$(document).ready(function(){
    init();
    
});
function init()
{
    canvas = document.getElementById("mycanvas");
    stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(500);
//    stage.on('mousedown',function(){
//        jumpEgg();
//    });
    initialXPosition = stage.canvas.width;
    initialYPosition = stage.canvas.height-100;
    createjs.Ticker.addEventListener("tick", stage);
    queue = new createjs.LoadQueue();
    queue.loadManifest([
        {id: "0", src: "img/nest.png"},
        {id: "1", src: "img/small-egg.png"},
        {id: "2", src: "img/white-egg.png"},
        
    ]);
    makeEgg();
    makeNest();
    addNestToStage();
//    cont.addChild(egg);
//    stage.addChild(cont);
//    stage.update();
}
/*
 * Function for creating nest and setting its x,y position
 */
function makeNest()
{
    //var image = queue.getResult(0).src;
    for(var i=0;i<=1;i++){
    var cont = new createjs.Container();
    var nest = new createjs.Bitmap("img/nest.png");
    cont.addChild(nest);
    cont.x = 200;
    cont.y = initialYPosition;
    nestArr.push(cont);
    cont.on('mousedown',function(){
        jumpEgg();
    });
    initialYPosition = initialYPosition - 300;
    }
    //return cont;
    //stage.addChild(nest);
    //stage.update();
}
/*
 * Function for creating egg
 */
function makeEgg()
{
    egg = new createjs.Bitmap("img/white-egg.png");
    egg.name = "egg";
    egg.x = 50;
    egg.y = -50;
//    stage.addChild(egg);
    //stage.update();
}
function tick()
{
    stage.update();
}
/*
 * Function for jumping egg
 */
function jumpEgg()
{
    stage.setChildIndex(egg,stage.getNumChildren()+1);
//    egg.regX = egg.image.width/2;
//    egg.regY = egg.image.height/2;
//   createjs.Tween.get(egg).to({visible: true, rotation:-360}, 100).call(onTweenComplete);
   createjs.Tween.get(egg).to({y: -300, visible: true}, 500).call(onTweenComplete);
}
/*
 * Function after tweening of egg is completed
 */
function onTweenComplete()
{
   createjs.Tween.get(egg).to({y: 100, visible: false}, 500);
   
}
/*
 * Function for adding nest to canvas
 */
function addNestToStage()
{
    for(var i=0;i<=1;i++)
    {    
        stage.addChild(nestArr[i]);
    }
    nestArr[0].addChild(egg);
}