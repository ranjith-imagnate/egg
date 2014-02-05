var canvas, stage, queue, egg;
var nestArr = [];
var stableNest = [0, 6, 13, 15];
var doubleNest = [3, 6, 9];
var movingNest = [0, 5, 10, 3, 6, 9];
var slowMovingNest = [2,5,9,10];
var eggHoldingNest = 0;
var eggFallingYPosition = 500;
var eggFallingSpeed = 700;
var initialXPosition, initialYPosition;
var scroll = 2000;
var jump = 1;
var score = 0;
var firstScroll = true;
var diffBetNest = 150;
$(document).ready(function() {
    $(".eggzy-canvas-wrapper").bind("mousewheel", function() {
        return false;
    });
    $('canvas').click(function() {
        jumpEgg();
    });
    $(document).keypress(function(event) {
        if (event.which == 32)
            jumpEgg();
    });
    initialize();

    init();
    $('.eggzy-canvas-wrapper').scrollTop(scroll);
});
function initialize()
{
    score = 0;
    $('.score-btn label').html(score);
}
function init()
{
    canvas = document.getElementById("mycanvas");
    stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(500);
    initialXPosition = stage.canvas.width;
    initialYPosition = stage.canvas.height - 70;
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

}
/*
 * Function for creating nest and setting its x,y position
 */
function makeNest()
{
    var j = 0;
    var stableNestXPosition = stage.canvas.width / 2 - 30;
    for (var i = 0; i < 12; i++) {
        var cont = new createjs.Container();
        var nest = new createjs.Bitmap("img/nest.png");
        cont.addChild(nest);
        cont.x = stableNestXPosition;
        cont.y = initialYPosition;
        cont.id = j;
        j++;
        nestArr.push(cont);
        cont.on('mousedown', function() {
            jumpEgg();
        });
        if (doubleNest.indexOf(i) != -1)
        {
            var cont = new createjs.Container();
            var nest = new createjs.Bitmap("img/nest.png");
            cont.addChild(nest);
            cont.x = 0;
            cont.y = initialYPosition;

            nestArr.push(cont);
            cont.id = j;
            nestArr[j - 1].x = stage.canvas.width - 130;

            j++;
        }

        if (movingNest.indexOf(i) == -1)
            cont.x = 0;
        if (doubleNest.indexOf(i) == -1 && stableNest.indexOf(j - 1) == -1 && i % 2 == 0)
            cont.x = canvas.width - 135;
        initialYPosition = initialYPosition - diffBetNest;
    }
    var cont = new createjs.Container();
    var nest = new createjs.Bitmap("img/hole-nest.png");
    cont.addChild(nest);
    cont.x = stage.canvas.width / 2 - 70;
    cont.y = initialYPosition - 50;
    cont.id = j;
    nestArr.push(cont);
}
/*
 * Function for creating egg
 */
function makeEgg()
{
    egg = new createjs.Bitmap("img/white-egg.png");
    egg.x = 50;
    egg.y = -50;

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
    $('canvas').off('click');
    $(document).off('keypress');
    var child = nestArr[eggHoldingNest];
    stage.setChildIndex(child, stage.getNumChildren() - 1);
    createjs.Tween.get(egg).to({y: -250, visible: true}, 200).call(onTweenComplete);

}
/*
 * Function after tweening of egg is completed
 */
function onTweenComplete()
{
    var targetNest;
    if (targetNest = checkIntersection())
    {
        egg.y = egg.y + 250 - 50;
        nestArr[eggHoldingNest + targetNest].addChild(egg);
        eggHoldingNest = eggHoldingNest + targetNest;
        eggFallingYPosition = eggFallingYPosition + 250 - 50;
        eggFallingSpeed = eggFallingSpeed + 200;
        jump++;
        score = score + 1000;
        $('.score-btn label').html(score);
        resetEvent();

    }
    else
    {
        createjs.Tween.get(egg).to({y: eggFallingYPosition, visible: true}, eggFallingSpeed).call(fallingDownEgg);

    }
    if (jump == 4)
    {
        if (firstScroll)
        {
            scroll = scroll - 1030;
            firstScroll = false;
        }
        else
            scroll = scroll - 450;
        $('.eggzy-canvas-wrapper').animate({scrollTop: scroll});
        jump = 1;
    }



}
/*
 * Function for adding nest to canvas
 */
function addNestToStage()
{
    for (var i = 0; i < 16; i++)
    {


        stage.addChild(nestArr[i]);
        var xpositionFrom = (i == 2 || i == 10 || i == 5 || i == 3 || i == 7 || i == 11) ? 0 : (nestArr[i].id == 4 || nestArr[i].id == 8 || nestArr[i].id == 12 ? canvas.width - 135 : canvas.width - 135);
        var xpositionTo = (i == 2 || i == 10) ? 0 : nestArr[i].x;
        var nestSpeed = slowMovingNest.indexOf(i)!=-1?5500:5000;
        if (stableNest.indexOf(i) == -1) {
            createjs.Tween.get(nestArr[i], {loop: true})
                    .to({x: xpositionFrom}, nestSpeed)
                    .to({x: nestArr[i].x}, nestSpeed)
        }
    }
    nestArr[0].addChild(egg);
    nestArr[0].name = 'egg';
}
function fallingDownEgg()
{
    egg.y = -50;
    nestArr[eggHoldingNest].addChild(egg);
    resetEvent();
}
function resetEvent()
{
    $('canvas').click(function() {
        jumpEgg();
    });
    $(document).keypress(function(event) {
        if (event.which == 32)
            jumpEgg();
    });
}
function checkIntersection()
{
    console.log(nestArr.length);
    var x1Diff = nestArr[eggHoldingNest + 1].x - nestArr[eggHoldingNest].x;
    var y1Diff = nestArr[eggHoldingNest + 1].y - nestArr[eggHoldingNest].y;
    var x2Diff = eggHoldingNest!=nestArr.length-2?nestArr[eggHoldingNest + 2].x - nestArr[eggHoldingNest].x:0;
    var y2Diff = eggHoldingNest!=nestArr.length-2?nestArr[eggHoldingNest + 2].y - nestArr[eggHoldingNest].y:0;
    if ((x1Diff <= 30 && x1Diff >= -30 && y1Diff <= -diffBetNest))
        return 1;
    else if ((x2Diff <= 30 && x2Diff >= -30 && y2Diff <= -diffBetNest))
        return 2;
    else
        return false;
}