var canvas, stage, queue, egg;
var nestArr = [];
var stableNest = [0, 6, 13];
var doubleNest = [3, 6, 9];
var test = [0, 5, 10, 3, 6, 9];
var eggHoldingNest = 0;
var eggFallingYPosition = 500;
var eggFallingSpeed = 700;
var initialXPosition, initialYPosition;
$(document).ready(function() {
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
    initialYPosition = stage.canvas.height - 100;
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
    var j = 0;
    for (var i = 0; i < 12; i++) {
        var cont = new createjs.Container();
        var nest = new createjs.Bitmap("img/nest.png");
        cont.addChild(nest);
        cont.x = 200;
        cont.y = initialYPosition;
        cont.id = j;
        j++;
        nestArr.push(cont);
        cont.on('mousedown', function() {
            jumpEgg();
        });
        if (doubleNest.indexOf(i) != -1)
        {
            console.log(i);
            var cont = new createjs.Container();
            var nest = new createjs.Bitmap("img/nest.png");
            cont.addChild(nest);
            cont.x = 0;
            cont.y = initialYPosition;
            nestArr.push(cont);
            cont.id = j;
            cont.on('mousedown', function() {
                jumpEgg();
            });
            j++;
        }
        if (test.indexOf(i) == -1)
            cont.x = 0;
        if(doubleNest.indexOf(i) == -1 && stableNest.indexOf(i)==-1 && i%2==0)
            cont.x = 500;
        initialYPosition = initialYPosition - 250;


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
    //egg.name = "egg";
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
    // var child = stage.getChildByName('egg');
    var child = nestArr[eggHoldingNest];
    stage.setChildIndex(child, stage.getNumChildren() - 1);

    //stage.update();
//    egg.regX = egg.image.width/2;
//    egg.regY = egg.image.height/2;
//   createjs.Tween.get(egg).to({visible: true, rotation:-360}, 100).call(onTweenComplete);
    createjs.Tween.get(egg).to({y: -350, visible: true}, 500).call(onTweenComplete);

}
/*
 * Function after tweening of egg is completed
 */
function onTweenComplete()
{
    //nestArr[0].removeChild(egg);
    // egg.x = egg.x-400;
    //var child = stage.getChildByName('egg');
    //var intersection = checkIntersection(egg,nestArr[1]);
    //            console.log(nestArr[1].x);
    //            console.log(nestArr[0].x);
    //var intersection = ndgmr.checkRectCollision(egg,nestArr[1]);
    //console.log(intersection);
    if ((nestArr[eggHoldingNest + 1].x - nestArr[eggHoldingNest].x) <= 30 && (nestArr[eggHoldingNest + 1].x - nestArr[eggHoldingNest].x) >= -30)
    {
        egg.y = egg.y + 350 - 50;
        nestArr[eggHoldingNest + 1].addChild(egg);
        eggHoldingNest = eggHoldingNest + 1;
        eggFallingYPosition = eggFallingYPosition + 350 - 50;
        eggFallingSpeed = eggFallingSpeed + 200;
    }
    else if ((nestArr[eggHoldingNest + 2].x - nestArr[eggHoldingNest].x) <= 30 && (nestArr[eggHoldingNest + 2].x - nestArr[eggHoldingNest].x) >= -30)
    {
        egg.y = egg.y + 350 - 50;
        nestArr[eggHoldingNest + 2].addChild(egg);
        eggHoldingNest = eggHoldingNest + 2;
        eggFallingYPosition = eggFallingYPosition + 350 - 50;
        eggFallingSpeed = eggFallingSpeed + 200;
    }
    else
    {
        createjs.Tween.get(egg).to({y: eggFallingYPosition, visible: true}, eggFallingSpeed).call(fallingDownEgg);

    }

}
/*
 * Function for adding nest to canvas
 */
function addNestToStage()
{
    for (var i = 0; i < 15; i++)
    {
        console.log(nestArr[i]);
        stage.addChild(nestArr[i]);
        var xpositionFrom = (i==2 || i==10)?0:(nestArr[i].id == 4 || nestArr[i].id == 8 || nestArr[i].id == 12 ? canvas.width - 400 : canvas.width - 135);
        var xpositionTo = i==2 || i==10 ?0:nestArr[i].x;
        if (stableNest.indexOf(i) == -1) {
            createjs.Tween.get(nestArr[i], {loop: true})
                    .to({x: xpositionFrom}, 2500)
                    .to({x: nestArr[i].x}, 2500)
        }
    }
    nestArr[0].addChild(egg);
    nestArr[0].name = 'egg';
}
function fallingDownEgg()
{
    egg.y = -50;
    nestArr[eggHoldingNest].addChild(egg);
}