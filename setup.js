var date = new Date();
var cacheVersion = date.getTime();
//var cacheVersion = 1;
//replace date.getTime() above with the version number when ready to upload. This will prevent caching during development but will allow it for a particular version number when uploaded.
var jsEnd = ".js?a=" + cacheVersion;
var stage;
var WIDTH = 800,
    HEIGHT = 600;

manifest = [
    {
        src: "scripts/vars" + jsEnd
    },
    {
        src: "scripts/levels" + jsEnd
    },
    {
        src: "scripts/keybinding" + jsEnd
    },
    {
        src: "scripts/mouseInit" + jsEnd
    },
    {
        src: "scripts/buildButtons" + jsEnd
    },
    {
        src: "scripts/gameLoop" + jsEnd
    },
    {
        src: "scripts/mainLoop" + jsEnd
    },
    //Assets below this line
    {
        src: "images/title.jpg",
        id: "title"
    },
    {
        src: "images/background.jpg",
        id: "background"
    },
    {
        src: "images/rules.jpg",
        id: "instructions"
    },
    {
        src: "images/gameover.jpg",
        id: "gameover"
    },
    {
        src: "sounds/loser.mp3",
        id: "loser"
    }
//    ,
//    {
//        src: "images/audiosprite.png",
//        id: "audiosprite"
//    }
];

function setupCanvas() {
    var canvas = document.getElementById("game");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    stage = new createjs.Stage(canvas);
}

function handleProgress() {

    loadingBar.scaleX = queue.progress * loadingBarWidth;

    progresPrecentage = Math.round(queue.progress * 100);
    loadProgressLabel.text = progresPrecentage + "% Loaded";

    stage.update();

}

function handleComplete() {

    backgroundImage = queue.getResult("background");
    //    treesImage = queue.getResult("trees");
    //    groundImage = queue.getResult("ground");

    loadProgressLabel.text = "Loading complete click to start";
    stage.update();
}

function loadComplete(evt) {
    //once the files are loaded, put them into usable objects
    titleScreen = new createjs.Bitmap(queue.getResult("title"));
    backgroundScreen = new createjs.Bitmap(queue.getResult("background"));
    instructionScreen = new createjs.Bitmap(queue.getResult("instructions"));
    gameoverScreen = new createjs.Bitmap(queue.getResult("gameover"));

    stage.addChild(backgroundScreen);
    stage.addChild(titleScreen);
    stage.addChild(instructionScreen);
    stage.addChild(gameoverScreen);
    instructionScreen.visible = false;
    gameoverScreen.visible = false;

    addButtons();
    mouseInit();
    bindKeys();
    gamestate = HOLD;
    startLoop();
}

function createLoadingBar() {

    loadingBarContainer = new createjs.Container();
    loadingBarHeight = 50;
    loadingBarWidth = 450;
    LoadingBarColor = createjs.Graphics.getRGB(0, 0, 0);
    loadingBar = new createjs.Shape();
    loadingBar.graphics.beginFill(LoadingBarColor).drawRect(0, 0, 1, loadingBarHeight).endFill();
    frame = new createjs.Shape();
    padding = 3;
    frame.graphics.setStrokeStyle(1).beginStroke(LoadingBarColor).drawRect(-padding / 2, -padding / 2, loadingBarWidth + padding, loadingBarHeight + padding);
    loadingBarContainer.addChild(loadingBar, frame);
    loadingBarContainer.x = Math.round(WIDTH / 2 - loadingBarWidth / 2);
    loadingBarContainer.y = (HEIGHT / 2) - (loadingBarHeight / 2);
    stage.addChild(loadingBarContainer);
    loadProgressLabel = new createjs.Text("", "18px Verdana", "#777");
    loadProgressLabel.lineWidth = 200;
    loadProgressLabel.textAlign = "center";
    loadProgressLabel.x = WIDTH / 2;
    loadProgressLabel.y = (HEIGHT / 2) - (18 / 2) - 1;
    stage.addChild(loadProgressLabel);
}

function loadFiles() {
    createLoadingBar();
    createjs.Sound.alternateExtensions = ["mp3"];
    queue = new createjs.LoadQueue(true, "Assets/"); //files are stored in 'images' directory
    queue.installPlugin(createjs.Sound);

    queue.on("complete", loadComplete, this); //when loading is done run 'loadComplete()'

    queue.loadManifest(manifest); //load files listed in 'manifest'
    queue.addEventListener("complete", handleComplete);
    queue.addEventListener("progress", handleProgress);
    locker = false;
}

(function main() {
    setupCanvas();
    loadFiles();
})();