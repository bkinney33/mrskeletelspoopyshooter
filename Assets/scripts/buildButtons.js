function addMainMenuButton() {
    /**********REPLACE THIS WITH A GROUP INSTEAD OF A RECT**********/
    stage.enableMouseOver(); //this is needed for mouseover and mouseout to work
    var padding = 25;
    var wid = 150,
        hei = 60;
    btnMM = new createjs.Shape();
    btnMM.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
    //    btnMM.x = (WIDTH - 125 / 2) - padding;
    //    btnMM.y = (HEIGHT - 50 / 2) - padding;
    btnMM.x = (WIDTH / 2);
    btnMM.y = (HEIGHT - hei / 2) - padding;
    var MMText = new createjs.Text("MENU", "30px Arial", "#FFF");
    var b = MMText.getBounds();
    MMText.x = (WIDTH / 2) - (b.width / 2);
    MMText.y = (HEIGHT - hei / 2) - (b.height / 2) - padding;

    mainMenu = new createjs.Container();
    mainMenu.addChild(btnMM, MMText);

    mainMenu.on("click", function (evt) {
        btnMM.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        MMText.color = "#FFF";
        //console.log("Clicked");
        titleScreen.visible = true;
        play.visible = true;
        tutorial.visible = false;
        rules.visible = true;
        instructionScreen.visible = false;
        back.visible = false;
        gamestate = INIT;
        gameoverScreen.visible = false;
        mainMenu.visible = false;
        createjs.Sound.stop();
    });
    mainMenu.on("mouseover", function (evt) {
        btnMM.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        MMText.color = "#FFF";
        //console.log("Mouse Over");
    });
    mainMenu.on("mouseout", function (evt) {
        btnMM.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
        MMText.color = "#FFF";
        //console.log("Mouse Out");
    });
    mainMenu.on("mousedown", function (evt) {
        btnMM.graphics.beginFill('#777').drawRect(-wid / 2, -hei / 2, wid, hei);
        MMText.color = "#000";
        //console.log("Mouse Down");
    });
    
    stage.addChild(mainMenu);
    mainMenu.visible = false;
}

function addPlayButton() {
    /**********REPLACE THIS WITH A GROUP INSTEAD OF A RECT**********/
    stage.enableMouseOver(); //this is needed for mouseover and mouseout to work
    var padding = 25;
    var wid = 150,
        hei = 60;
    btnPlay = new createjs.Shape();
    btnPlay.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
    //    btnPlay.x = (WIDTH - 125 / 2) - padding;
    //    btnPlay.y = (HEIGHT - 50 / 2) - padding;
    btnPlay.x = (WIDTH / 2);
    btnPlay.y = (HEIGHT - hei / 2) - padding;
    var playText = new createjs.Text("PLAY", "30px Arial", "#FFF");
    var b = playText.getBounds();
    playText.x = (WIDTH / 2) - (b.width / 2);
    playText.y = (HEIGHT - hei / 2) - (b.height / 2) - padding;

    play = new createjs.Container();
    play.addChild(btnPlay, playText);

    play.on("click", function (evt) {
        btnPlay.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        playText.color = "#FFF";
        //console.log("Clicked");
        titleScreen.visible = false;
        play.visible = false;
        tutorial.visible = false;
        rules.visible = false;
        instructionScreen.visible = false;
        back.visible = false;
        gamestate = RUN;
        createjs.Sound.stop();
    });
    play.on("mouseover", function (evt) {
        btnPlay.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        playText.color = "#FFF";
        //console.log("Mouse Over");
    });
    play.on("mouseout", function (evt) {
        btnPlay.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
        playText.color = "#FFF";
        //console.log("Mouse Out");
    });
    play.on("mousedown", function (evt) {
        btnPlay.graphics.beginFill('#777').drawRect(-wid / 2, -hei / 2, wid, hei);
        playText.color = "#000";
        //console.log("Mouse Down");
    });

    stage.addChild(play);
}

function addRulesButton() {
    /**********REPLACE THIS WITH A GROUP INSTEAD OF A RECT**********/
    stage.enableMouseOver(); //this is needed for mouseover and mouseout to work
    var padding = 35;
    var wid = 100,
        hei = 40;
    var btnRules = new createjs.Shape();
    btnRules.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
    //    btnRules.x = (WIDTH - 125 / 2) - padding;
    //    btnRules.y = (HEIGHT - 50 / 2) - padding;
    btnRules.x = (WIDTH - wid / 2) - padding;
    btnRules.y = (HEIGHT - hei / 2) - padding;
    var rulesText = new createjs.Text("Rules", "24px Arial", "#FFF");
    var b = rulesText.getBounds();
    rulesText.x = (WIDTH - wid / 2) - (b.width / 2) - padding; //vert. & horiz. centers the text into rect with padding
    rulesText.y = (HEIGHT - hei / 2) - (b.height / 2) - padding;

    rules = new createjs.Container();
    rules.addChild(btnRules, rulesText);

    rules.on("click", function (evt) {
        btnRules.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        rulesText.color = "#FFF";
        //console.log("Clicked");
        back.visible = true;
        rules.visible = false;
        instructionScreen.visible = true;
    });
    rules.on("mouseover", function (evt) {
        btnRules.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        rulesText.color = "#FFF";
        //console.log("Mouse Over");
    });
    rules.on("mouseout", function (evt) {
        btnRules.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
        rulesText.color = "#FFF";
        //console.log("Mouse Out");
    });
    rules.on("mousedown", function (evt) {
        btnRules.graphics.beginFill('#ccc').drawRect(-wid / 2, -hei / 2, wid, hei);
        rulesText.color = "#000";
        //console.log("Mouse Down");
    });

    stage.addChild(rules);
}

function addBackButton() {
    stage.enableMouseOver(); //this is needed for mouseover and mouseout to work
    var padding = 35;
    var wid = 100,
        hei = 40;
    var btnBack = new createjs.Shape();
    btnBack.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
    //    btnBack.x = (WIDTH - 125 / 2) - padding;
    //    btnBack.y = (HEIGHT - 50 / 2) - padding;
    btnBack.x = (WIDTH - wid / 2) - padding;
    btnBack.y = (HEIGHT - hei / 2) - padding;
    var BackText = new createjs.Text("Back", "24px Arial", "#FFF");
    var b = BackText.getBounds();
    BackText.x = (WIDTH - wid / 2) - (b.width / 2) - padding; //vert. & horiz. centers the text into rect with padding
    BackText.y = (HEIGHT - hei / 2) - (b.height / 2) - padding;

    back = new createjs.Container();
    back.addChild(btnBack, BackText);

    back.on("click", function (evt) {
        btnBack.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        BackText.color = "#FFF";
        //console.log("Clicked");
        back.visible = false;
        rules.visible = true;
        instructionScreen.visible = false;
    });
    back.on("mouseover", function (evt) {
        btnBack.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        BackText.color = "#FFF";
        //console.log("Mouse Over");
    });
    back.on("mouseout", function (evt) {
        btnBack.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
        BackText.color = "#FFF";
        //console.log("Mouse Out");
    });
    back.on("mousedown", function (evt) {
        btnBack.graphics.beginFill('#ccc').drawRect(-wid / 2, -hei / 2, wid, hei);
        BackText.color = "#000";
        //console.log("Mouse Down");
    });

    stage.addChild(back);
}

function addTutorialButton() {
    /**********REPLACE THIS WITH A GROUP INSTEAD OF A RECT**********/
    stage.enableMouseOver(); //this is needed for mouseover and mouseout to work
    var padding = 35;
    var wid = 100,
        hei = 40;
    var btnTutorial = new createjs.Shape();
    btnTutorial.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
    btnTutorial.x = (wid / 2) + padding;
    btnTutorial.y = (HEIGHT - hei / 2) - padding;

    btnTutorial.on("click", function (evt) {
        btnTutorial.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        //console.log("Clicked");
    });
    btnTutorial.on("mouseover", function (evt) {
        btnTutorial.graphics.beginFill('#444').drawRect(-wid / 2, -hei / 2, wid, hei);
        //console.log("Mouse Over");
    });
    btnTutorial.on("mouseout", function (evt) {
        btnTutorial.graphics.beginFill('#000').drawRect(-wid / 2, -hei / 2, wid, hei);
        //console.log("Mouse Out");
    });
    btnTutorial.on("mousedown", function (evt) {
        btnTutorial.graphics.beginFill('#777').drawRect(-wid / 2, -hei / 2, wid, hei);
        //console.log("Mouse Down");
    });

    tutorial = new createjs.Container();
    tutorial.addChild(btnTutorial);

    stage.addChild(tutorial);
    tutorial.visible = false;

    //    tutorial.visible = false;
}

function addMuteSprite(){
    var data = {
        images: ["Assets/images/audiosprite.png"],
        frames: {width: 50, height: 50},
        animations: {
            playing: 0,
            muted: 1
        }
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    var muteButton = new createjs.Sprite(spriteSheet, "playing");
    
    //replace sprite with image(s)
    
    stage.addChild(muteButton);
    
    muteButton.x = 50;
    muteButton.y = 520;
    
    muteButton.addEventListener("click", function(){
        muted = !muted;
        if(muted){
            muteButton.gotoAndPlay("muted");
        } else {
            muteButton.gotoAndPlay("playing");
        }
    });
}

function addButtons() {
    addPlayButton();
    addRulesButton();
    addBackButton();
    back.visible = false;
    addMainMenuButton();
    addTutorialButton();
    addMuteSprite();
    
}