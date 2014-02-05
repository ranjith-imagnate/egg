<html>
    <head>
        <link rel="stylesheet" type="text/css"  href="css/eggzy.css" />
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <script type="text/javascript" src="js/createjs.min.js"></script>
        <script type="text/javascript" src="js/Collision.js"></script>
        <script type="text/javascript" src="js/eggzy.js"></script>
    </head>        
    <body>
        <div class="eggzy-game-wrapper">
            <div class="eggzy-game-headr">
                <div class="level-block"> 
                    <div class="level-btn">
                        <span> Level 1</span>
                    </div>
                </div>
                <div class="high-score-block"> 
                    <span>High score:</span>
                    <span id="high_score">0</span>
                </div>
                <div class="buttons timing-btn"> 
                    <div class="v-line"></div>
                    <div class=" v-line v-line2"></div>
                    <label>00</label><label>:</label> <label>00</label><label>:</label><label>00</label>
                </div>
                <div class="buttons score-btn">
                    <div class="v-line"></div>
                    <div class=" v-line v-line2"></div>
                    <label>000000</label>
                </div>
                <div class="misscount-block"> 
                    <div class="egg miss-egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                    <div class="egg"></div>
                </div>
            </div>
            <div class="eggzy-canvas-wrapper">
                <div class="left-sidebar-bg"> </div>
                <div class="eggzy-game-canvas">
                    <canvas id="mycanvas" width="720" height="3000" class="canvas-bg" style=""></canvas>
                </div>
                <div class="right-sidebar-bg"> </div>
                <div class="game-finish-hint-bar">
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line"> </div>
                    <div class="hint-line selected-hint-line"> </div>
                </div>
            </div>

            <div class="sound-btn-area">
                <div class="play-btn" style="display: none"></div>
                <div class="pause-btn">
                    <span class="vertical-line-first"></span>
                    <span class="vertical-line-first"></span>
                </div>
                <div class="sounds mute-sound"></div>
                <div class="sounds unmute-sound" style="display: none;"></div>
            </div>

        </div>

    </body>
</html>