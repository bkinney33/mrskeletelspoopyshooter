function resetGameTimer() {
    gameTimer = 0;
}

function loop() {
    document.getElementById("output").innerHTML = "MousePos: (" + mouseX + ", " + mouseY + ")";
    gameLoop();
    stage.update(); //leave this at the bottom of the loop
}

function startLoop() {
    gamestate = INIT;
    createjs.Ticker.addEventListener('tick', loop);
    createjs.Ticker.setFPS(FPS);
}