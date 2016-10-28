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
        src: "images/h_bone.png",
        id: "h_bone"
    },
    {
        src: "images/v_bone.png",
        id: "v_bone"
    },
    {
        src: "images/s_bone.png",
        id: "s_bone"
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
        src: "images/levelup.jpg",
        id: "levelupimg"
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
        src: "images/paused.jpg",
        id: "paused"
    },
    {
        src: "sounds/loser.mp3",
        id: "loser"
    },
    /*Sprite Assets and JS below this line*/
    {
        src: "images/skeltal.png",
        id: "skeltal_sheet"
    }
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
    levelupimg = new createjs.Bitmap(queue.getResult("levelupimg"));
    pauseScreen = new createjs.Bitmap(queue.getResult("paused"));
    //    bone = new createjs.Bitmap(queue.getResult("bone"));

    player._SpriteSheet = new createjs.SpriteSheet({
        images: [queue.getResult("skeltal_sheet")],
        frames: [
            [0, 0, 30, 42, 0, 12.7, 40.25], /*0-23*/
            [30, 0, 46, 41, 0, 11.7, 40.25],
            [76, 0, 33, 40, 0, 10.7, 40.25],
            [109, 0, 27, 41, 0, 8.7, 40.25],
            [136, 0, 24, 41, 0, 7.699999999999999, 40.25],
            [160, 0, 19, 41, 0, 6.699999999999999, 40.25],
            [179, 0, 22, 40, 0, 8.7, 39.25],
            [201, 0, 22, 42, 0, 9.7, 40.25],
            [223, 0, 28, 42, 0, 11.7, 40.25],
            [0, 42, 31, 42, 0, 12.7, 40.25],
            [31, 42, 36, 42, 0, 13.7, 40.25],
            [67, 42, 49, 42, 0, 14.7, 40.25],
            [116, 42, 30, 42, 0, 15.7, 40.25],
            [146, 42, 49, 41, 0, 14.7, 40.25],
            [195, 42, 36, 40, 0, 13.7, 40.25],
            [0, 84, 31, 41, 0, 12.7, 40.25],
            [31, 84, 28, 41, 0, 11.7, 40.25],
            [59, 84, 22, 41, 0, 9.7, 40.25],
            [179, 0, 22, 40, 0, 8.7, 39.25],
            [81, 84, 19, 42, 0, 6.699999999999999, 40.25],
            [100, 84, 22, 42, 0, 5.699999999999999, 40.25],
            [122, 84, 25, 42, 0, 6.699999999999999, 40.25],
            [147, 84, 31, 42, 0, 8.7, 40.25],
            [178, 84, 45, 42, 0, 10.7, 40.25], /*23*/
            [0, 0, 30, 42, 0, 12.7, 40.25],
            [223, 84, 20, 41, 0, 8.7, 40.25], /*25*/
            [0, 126, 21, 52, 0, 16.7, 51.25]],
        /*26*/
        animations: {
            walk: [0, 23, "walk", 1],
            run: [0, 23, "run", 3],
            idle: 25,
            shoot: 26
        }
    });

    stage.addChild(backgroundScreen);
    stage.addChild(titleScreen);
    stage.addChild(instructionScreen);
    stage.addChild(gameoverScreen);
    stage.addChild(pauseScreen);
    pauseScreen.visible = false;
    instructionScreen.visible = false;
    gameoverScreen.visible = false;

    addButtons();
    mouseInit();
    bindKeys();
    gamestate = HOLD;
    stage.addChild(levelupimg);
    levelupimg.visible = false;
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