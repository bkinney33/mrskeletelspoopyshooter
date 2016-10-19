function runGameTimer() {
    frameCount += 1;
    if (frameCount % (FPS / 10) === 0) {
        gameTimer = frameCount / (FPS);
    }
}

function gameLoop() {
    switch (gamestate) {
    case INIT:
        console.error("INIT");
        timer = new createjs.Text("", "24px Arial", "#000");
        stage.addChild(timer);
        //        menuMusic.play({
        //            loop: -1
        //        });
        //        createjs.Sound.volume = 0.5;
        gamestate = HOLD;
        locker = true;
        break;
    case RUN:
        runGameTimer();
        //        if (locker) {
        //            chase.play({
        //                loop: -1
        //            });
        //            locker = false;
        //        }
        //        if (muted) {
        //            chase.paused = true;
        //        } else {
        //            chase.paused = false;
        //        }
        timer.text = gameTimer + " sec";
        var b = timer.getBounds();
        timer.x = (WIDTH - b.width) / 2;
        timer.y = 10;
        if (gameTimer >= MAX_RUNTIME) {
            gamestate = GAMEOVER;
        }
        break;
    case GAMEOVER:
        //        console.error("GAMEOVER");
        timer.text = "";
        gameTimer = 0;
        frameCount = 0;
        running = false;
        gameoverScreen.visible = true;
        mainMenu.visible = true;
        //        createjs.Sound.stop();
        //        if (!muted) {
        //            createjs.Sound.play("loser");
        //        }
        gamestate = HOLD;
        break;
    case HOLD:
        //        if (muted) {
        //            menuMusic.paused = true;
        //        } else {
        //            menuMusic.paused = false;
        //        }
        break;
    default:
        console.error("BORKED");
        break;
    }
    stage.update();
}