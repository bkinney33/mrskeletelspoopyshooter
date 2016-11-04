var date = new Date();
var cacheVersion = date.getTime();
//var cacheVersion = "1.0.0";
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
        src: "scripts/ndgmr.Collision" + jsEnd
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
        src: "images/tombstone.png",
        id: "tombstone"
    },
    {
        src: "images/boo1.png",
        id: "white_ghost"
    },
    {
        src: "images/boo2.png",
        id: "blue_ghost"
    },
    {
        src: "images/boo3.png",
        id: "yellow_ghost"
    },
    {
        src: "images/boo4.png",
        id: "orange_ghost"
    },
    {
        src: "images/Credits.jpg",
        id: "credits"
    },
    {
        src: "sounds/loser.wav",
        id: "loser"
    },
    {
        src: "sounds/main_menu.wav",
        id: "main"
    },
    {
        src: "sounds/loop.wav",
        id: "loop_music"
    },
    {
        src: "sounds/doot.wav",
        id: "dootFX"
    },
    {
        src: "sounds/death.wav",
        id: "deathFX"
    },
    {
        src: "sounds/hit.wav",
        id: "hitFX"
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
        src: "images/audiosprite.png",
        id: "mutebutton"
    },
    /*Sprite Assets and JS below this line*/
    {
        src: "images/skeltal.png",
        id: "skeltal_sheet"
    },
    {
        src: "images/_doot.png",
        id: "doot"
    },
//    {
//        src: "images/doot.png",
//        id: "doot"
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
    //    backgroundImage = queue.getResult("background");
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
    credits = new createjs.Bitmap(queue.getResult("credits"));
    //    doot = new createjs.Bitmap(queue.getResult("doot"));
    doot = new createjs.Sprite(new createjs.SpriteSheet({
        images: [queue.getResult("doot")],
        frames: [
                [0, 0, 156, 198, 0, -21.6, 93.1],
                [156, 0, 152, 198, 0, -23.6, 95.1],
                [308, 0, 160, 198, 0, -19.6, 91.1],
                [0, 198, 158, 198, 0, -20.6, 92.1],
                [158, 198, 152, 198, 0, -23.6, 95.1],
                [310, 198, 146, 198, 0, -26.6, 98.1],
                [0, 396, 142, 198, 0, -28.6, 100.1],
                [0, 396, 142, 198, 0, -28.6, 100.1],
                [142, 396, 150, 198, 0, -24.6, 96.1],
                [292, 396, 158, 198, 0, -20.6, 92.1],
                [292, 396, 158, 198, 0, -20.6, 92.1],
                [0, 594, 156, 198, 0, -21.6, 93.1],
                [156, 594, 158, 198, 0, -20.6, 92.1],
                [314, 594, 158, 198, 0, -20.6, 92.1],
                [0, 792, 158, 198, 0, -20.6, 92.1],
                [158, 792, 162, 198, 0, -18.6, 90.1],
                [320, 792, 144, 198, 0, -27.6, 99.1]],
        animations: {
            run: [0, 17, "run", .5]
        }
    }));
    doot.scaleX = doot.scaleY = (30 / doot.getBounds().width);

    menuMusic = createjs.Sound.createInstance("main");
    loopMusic = createjs.Sound.createInstance("loop_music");
    loser = createjs.Sound.createInstance("loser");
    dootFX = createjs.Sound.createInstance("dootFX");
    deathFX = createjs.Sound.createInstance("deathFX");
    hitFX = createjs.Sound.createInstance("hitFX");

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
    stage.addChild(credits);
    stage.addChild(instructionScreen);
    stage.addChild(gameoverScreen);
    stage.addChild(pauseScreen);
    credits.visible = false;
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
    LoadingBarColor = createjs.Graphics.getRGB(50, 50, 50);
    loadingBar = new createjs.Shape();
    loadingBar.graphics.beginFill(LoadingBarColor).drawRect(0, 0, 1, loadingBarHeight).endFill();
    frame = new createjs.Shape();
    padding = 3;
    frame.graphics.setStrokeStyle(1).beginStroke(LoadingBarColor).drawRect(-padding / 2, -padding / 2, loadingBarWidth + padding, loadingBarHeight + padding);
    loadingBarContainer.addChild(loadingBar, frame);
    loadingBarContainer.x = Math.round(WIDTH / 2 - loadingBarWidth / 2);
    loadingBarContainer.y = (HEIGHT / 2) - (loadingBarHeight / 2);
    stage.addChild(loadingBarContainer);
    loadProgressLabel = new createjs.Text("", "18px Verdana", "#F80");
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