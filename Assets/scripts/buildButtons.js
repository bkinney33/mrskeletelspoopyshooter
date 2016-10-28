var roundness = 15,
    b1y = 400,
    b3y = 475,
    b2y = 530;

function addMainMenuButton() {
    /**********REPLACE THIS WITH A GROUP INSTEAD OF A RECT**********/

    var padding = 25;
    var wid = 150,
        hei = 60;
    btnMM = new createjs.Shape();
    btnMM.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
    var MMText = new createjs.Text("MENU", "30px bonehead", "#F80");
    var b = MMText.getBounds();
    MMText.x = (wid - b.width) / 2;
    MMText.y = (hei - b.height) / 2;

    mainMenu = new createjs.Container();
    mainMenu.setBounds(0, 0, wid, hei);
    var bnd = mainMenu.getBounds();
    mainMenu.x = (WIDTH - bnd.width) / 2;
    mainMenu.y = 500;
    mainMenu.addChild(btnMM, MMText);

    mainMenu.on("click", function (evt) {
        btnMM.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        MMText.color = "#FFF";
        //console.log("Clicked");
        titleScreen.visible = true;
        play.visible = true;
        tutorial.visible = true;
        rules.visible = true;
        instructionScreen.visible = false;
        retry.visible = false;
        back.visible = false;
        stage.removeChild(scoreLabel);
        scoreLabel.visible = false;
        gamestate = INIT;
        gameoverScreen.visible = false;
        mainMenu.visible = false;
        createjs.Sound.stop();
    });
    mainMenu.on("mouseover", function (evt) {
        btnMM.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        MMText.color = "#FFF";
        //console.log("Mouse Over");
    });
    mainMenu.on("mouseout", function (evt) {
        btnMM.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        MMText.color = "#F80";
        //console.log("Mouse Out");
    });
    mainMenu.on("mousedown", function (evt) {
        btnMM.graphics.beginFill('#777').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        MMText.color = "#000";
        //console.log("Mouse Down");
    });

    stage.addChild(mainMenu);
    mainMenu.visible = false;
}

function addPlayButton() {
    /**********REPLACE THIS WITH A GROUP INSTEAD OF A RECT**********/

    var padding = 25;
    var wid = 150,
        hei = 60;
    var btnPlay = new createjs.Shape();
    btnPlay.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);

    var playText = new createjs.Text("PLAY", "30px bonehead", "#F80");
    var b = playText.getBounds();
    playText.x = (wid - b.width) / 2;
    playText.y = (hei - b.height) / 2;

    play = new createjs.Container();
    play.setBounds(0, 0, wid, hei);
    var bnd = play.getBounds();
    play.x = (WIDTH - bnd.width) / 2;
    play.y = b1y;
    play.addChild(btnPlay, playText);

    play.on("click", function (evt) {
        btnPlay.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        playText.color = "#FFF";
        //console.log("Clicked");
        titleScreen.visible = false;
        play.visible = false;
        tutorial.visible = false;
        rules.visible = false;
        instructionScreen.visible = false;
        back.visible = false;
        levels = (secret) ? secret_levels : main_levels;
        secret = false;
        //        //levels = secret_levels;
        //        levels = main_levels;
        gamestate = RUN;
        createjs.Sound.stop();
    });
    play.on("mouseover", function (evt) {
        btnPlay.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        playText.color = "#FFF";
        //console.log("Mouse Over");
    });
    play.on("mouseout", function (evt) {
        btnPlay.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        playText.color = "#F80";
        //console.log("Mouse Out");
    });
    play.on("mousedown", function (evt) {
        btnPlay.graphics.beginFill('#777').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        playText.color = "#000";
        //console.log("Mouse Down");
    });

    stage.addChild(play);
}

function addRulesButton() {

    var padding = 5;
    var wid = 100,
        hei = 40;
    var btnRules = new createjs.Shape();
    btnRules.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
    var rulesText = new createjs.Text("Rules", "24px bonehead", "#F80");
    var b = rulesText.getBounds();
    rulesText.x = (wid - b.width) / 2;
    rulesText.y = (hei - b.height) / 2;

    rules = new createjs.Container();
    rules.setBounds(0, 0, wid, hei);
    var bnd = rules.getBounds();
    rules.x = (WIDTH - bnd.width) / 2;
    rules.y = b3y;
    rules.addChild(btnRules, rulesText);

    rules.on("click", function (evt) {
        btnRules.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        rulesText.color = "#FFF";
        //console.log("Clicked");
        back.visible = true;
        play.visible = false;
        rules.visible = false;
        tutorial.visible = false;
        instructionScreen.visible = true;
    });
    rules.on("mouseover", function (evt) {
        btnRules.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        rulesText.color = "#FFF";
        //console.log("Mouse Over");
    });
    rules.on("mouseout", function (evt) {
        btnRules.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        rulesText.color = "#F80";
        //console.log("Mouse Out");
    });
    rules.on("mousedown", function (evt) {
        btnRules.graphics.beginFill('#ccc').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        rulesText.color = "#000";
        //console.log("Mouse Down");
    });

    //stage.addChild(rules);
}

function addBackButton() {
    var padding = 35;
    var wid = 100,
        hei = 40;
    var btnBack = new createjs.Shape();
    btnBack.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
    var BackText = new createjs.Text("Back", "24px bonehead", "#F80");
    var b = BackText.getBounds();
    BackText.x = (wid - b.width) / 2;
    BackText.y = (hei - b.height) / 2;

    back = new createjs.Container();
    back.setBounds(0, 0, wid, hei);
    var bnd = back.getBounds();
    back.x = (WIDTH - bnd.width) / 2;
    back.y = b3y;
    back.addChild(btnBack, BackText);

    back.on("click", function (evt) {
        btnBack.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        BackText.color = "#FFF";
        //console.log("Clicked");
        back.visible = false;
        play.visible = true;
        rules.visible = true;
        tutorial.visible = true;
        instructionScreen.visible = false;
    });
    back.on("mouseover", function (evt) {
        btnBack.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        BackText.color = "#FFF";
        //console.log("Mouse Over");
    });
    back.on("mouseout", function (evt) {
        btnBack.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        BackText.color = "#F80";
        //console.log("Mouse Out");
    });
    back.on("mousedown", function (evt) {
        btnBack.graphics.beginFill('#ccc').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        BackText.color = "#000";
        //console.log("Mouse Down");
    });

    stage.addChild(back);
}

function addRetryButton() {
    var padding = 25;
    var wid = 150,
        hei = 60;
    btnPlay = new createjs.Shape();
    btnPlay.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);

    var retryText = new createjs.Text("RETRY", "30px bonehead", "#F80");
    var b = retryText.getBounds();
    retryText.x = (wid - b.width) / 2;
    retryText.y = (hei - b.height) / 2;

    retry = new createjs.Container();
    retry.setBounds(0, 0, wid, hei);
    var bnd = retry.getBounds();
    retry.x = (WIDTH - bnd.width) / 2;
    retry.y = b1y;
    retry.addChild(btnPlay, retryText);

    retry.on("click", function (evt) {
        btnPlay.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        retryText.color = "#FFF";
        //console.log("Clicked");
        titleScreen.visible = false;
        retry.visible = false;
        tutorial.visible = false;
        rules.visible = false;
        instructionScreen.visible = false;
        back.visible = false;
        gamestate = RETRYLEVEL;
        createjs.Sound.stop();
    });
    retry.on("mouseover", function (evt) {
        btnPlay.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        retryText.color = "#FFF";
        //console.log("Mouse Over");
    });
    retry.on("mouseout", function (evt) {
        btnPlay.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        retryText.color = "#F80";
        //console.log("Mouse Out");
    });
    retry.on("mousedown", function (evt) {
        btnPlay.graphics.beginFill('#777').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        retryText.color = "#000";
        //console.log("Mouse Down");
    });

    stage.addChild(retry);
    retry.visible = false;
}

function addTutorialButton() {
    /**********REPLACE THIS WITH A GROUP INSTEAD OF A RECT**********/

    var padding = 35;
    var wid = 100,
        hei = 40;
    var btnTutorial = new createjs.Shape();
    btnTutorial.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);

    var demoText = new createjs.Text("Demo", "24px bonehead", "#F80");
    var b = demoText.getBounds();
    demoText.x = (wid - b.width) / 2;
    demoText.y = (hei - b.height) / 2;

    //    btnTutorial.x = (wid / 2) + padding;
    //    btnTutorial.y = (HEIGHT - hei / 2) - padding;

    tutorial = new createjs.Container();
    tutorial.addChild(btnTutorial);
    tutorial.addChild(demoText);

    tutorial.setBounds(0, 0, wid, hei);
    var b = tutorial.getBounds();
    tutorial.x = (WIDTH - b.width) / 2;
    tutorial.y = b2y;

    stage.addChild(tutorial);


    btnTutorial.on("click", function (evt) {
        btnTutorial.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);

        //console.log("Clicked");
        levels = demo_levels;
        titleScreen.visible = false;
        play.visible = false;
        tutorial.visible = false;
        rules.visible = false;
        instructionScreen.visible = false;
        back.visible = false;
        gamestate = RUN;
        createjs.Sound.stop();

        //console.log("Clicked");

    });
    btnTutorial.on("mouseover", function (evt) {
        btnTutorial.graphics.beginFill('#444').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        //console.log("Mouse Over");
    });
    btnTutorial.on("mouseout", function (evt) {
        btnTutorial.graphics.beginFill('#000').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        //console.log("Mouse Out");
    });
    btnTutorial.on("mousedown", function (evt) {
        btnTutorial.graphics.beginFill('#777').beginStroke("#868686").setStrokeStyle(3, "round").drawRoundRect(0, 0, wid, hei, roundness);
        //console.log("Mouse Down");
    });

    //    tutorial.visible = false;
}

function addMuteSprite() {
    //    var data = {
    //        images: ["Assets/images/audiosprite.png"],
    //        frames: {width: 50, height: 50},
    //        animations: {
    //            playing: 0,
    //            muted: 1
    //        }
    //    };
    //    var spriteSheet = new createjs.SpriteSheet(data);
    //    var muteButton = new createjs.Sprite(spriteSheet, "playing");
    //    
    //    //replace sprite with image(s)
    //    
    //    stage.addChild(muteButton);
    //    
    //    muteButton.x = 50;
    //    muteButton.y = 520;
    //    
    //    muteButton.addEventListener("click", function(){
    //        muted = !muted;
    //        if(muted){
    //            muteButton.gotoAndPlay("muted");
    //        } else {
    //            muteButton.gotoAndPlay("playing");
    //        }
    //    });
}

function addButtons() {
    //this is needed for mouseover and mouseout to work
    stage.enableMouseOver();
    addPlayButton();
    addRetryButton();
    addRulesButton();
    addBackButton();
    back.visible = false;
    addMainMenuButton();
    addTutorialButton();
    addMuteSprite();
    stage.enableMouseOver();
}