var tempScore = 0;

function setup() {
    stage.removeChild(levelsign);
    levelupimg.visible = false;
    tempScore = player.score;
    player.obj.visible = true;
    ground.visible = true;
    cheated = false;
    firstHit = true;
    forward = true;
    p = 0;
    var i;
    ghosts = [];
    for (i = 0; i < levels[current_level].ghosts.length; i++) {
        ghosts.push(levels[current_level].ghosts[i]);
    }
    //draw paths first, so all ghosts will overlap any path
    for (i = 0; i < ghosts.length; i++) {
        stage.addChild(ghosts[i].path);
    }
    for (i = 0; i < ghosts.length; i++) {
        ghosts[i].alive = true;
        ghosts[i].obj.alpha = 1;
        stage.addChild(ghosts[i].obj);
    }
    for (i = 0; i < levels[current_level].walls.length; i++) {
        stage.addChild(levels[current_level].walls[i].obj);
    }
    if (levels[current_level].labels.length > 0) {
        for (i = 0; i < levels[current_level].labels.length; i++) {
            var lab = levels[current_level].labels[i];
            lab.obj.shadow = new createjs.Shadow("#000000", 0, 0, 5);
            stage.addChild(lab.obj);
            var bnd = lab.obj.getBounds();
            lab.obj.x = (WIDTH - bnd.width) * lab.x;
            lab.obj.y = (HEIGHT - bnd.height) * lab.y;
        }
    }

    player.bullets = levels[current_level].bullets;
    levelLabel.text = "Level " + (current_level + 1);
    var b = levelLabel.getBounds();
    levelLabel.x = (WIDTH - b.width) / 2;

    bulletLabel.text = "Bullets Left: " + player.bullets;
    var bb = bulletLabel.getBounds();
    bulletLabel.x = (WIDTH - bb.width) * .2;
    bulletLabel.y = (HEIGHT - (groundHeight / 2)) - (bb.height / 2);

    scoreLabel.text = "Score: " + tempScore;
    bb = scoreLabel.getBounds();
    scoreLabel.x = (WIDTH - bb.width) * .5;
    scoreLabel.y = (HEIGHT - (groundHeight / 2)) - (bb.height / 2);

    livesLabel.text = "Lives Left: " + player.lives;
    bb = livesLabel.getBounds();
    livesLabel.x = (WIDTH - bb.width) * .8;
    livesLabel.y = (HEIGHT - (groundHeight / 2)) - (bb.height / 2);
}

function teardown() {
    player.obj.visible = false;
    ground.visible = false;
    var i = 0;
    if(ghosts){
        for (i = 0; i < ghosts.length; i++) {
            stage.removeChild(ghosts[i].obj);
            stage.removeChild(ghosts[i].path);
        }
    }
    ghosts = null;
    for (i = 0; i < levels[current_level].walls.length; i++) {
        stage.removeChild(levels[current_level].walls[i].obj);
    }
    for (i = 0; i < bullets.length; i++) {
        stage.removeChild(bullets[i]);
    }

    if (levels[current_level].labels.length > 0) {
        for (i = 0; i < levels[current_level].labels.length; i++) {
            var lab = levels[current_level].labels[i];
            stage.removeChild(lab.obj);
        }
    }

    bulletLabel.text = "";
    levelLabel.text = "";
    livesLabel.text = "";
}

function gameLoop() {
    switch (gamestate) {
    case INIT:
        // console.error("INIT");
        player.score = 0;
        ground = new createjs.Shape();
        //turned off "grass"
        var gWidth = (WIDTH * 1.5);
        //.beginStroke("#060").setStrokeStyle(2)
        ground.graphics.beginFill("#573c00").drawRect(0, 0, gWidth, (500));
        ground.y = HEIGHT - groundHeight;
        ground.x = (WIDTH - (gWidth)) / 2;
        stage.addChild(ground);
        ground.visible = false;

        var size = 25;
        player.obj = new createjs.Shape();
        player.obj.graphics.beginFill("#FFF").drawRect(-(size/2), 0, size, size);
        player.obj.setBounds(0, 0, size, size);
        stage.addChild(player.obj);
        player.obj.x = WIDTH / 2;
        player.obj.y = (HEIGHT - groundHeight) - (size);
        player.obj.setBounds(0, 0, size, size);
        player.obj.visible = false;
        levelLabel = new createjs.Text("", "32px bonehead", "#F80");
        bulletLabel = new createjs.Text("", "24px bonehead", "#F80");
        scoreLabel = new createjs.Text("", "24px bonehead", "#F80");
        livesLabel = new createjs.Text("", "24px bonehead", "#F80");
        stage.addChild(levelLabel);
        stage.addChild(bulletLabel);
        stage.addChild(scoreLabel);
        stage.addChild(livesLabel);

        current_level = 0;

        player.lives = 3;
        locker = true;
        gamestate = HOLD;
        break;
    case HOLD:
        //        if (muted) {
        //            menuMusic.paused = true;
        //        } else {
        //            menuMusic.paused = false;
        //        }
        break;
    case RUN:
        if (locker) {
            setup();
            //            chase.play({
            //                loop: -1
            //            });
            locker = false;
        }
        //        if (muted) {
        //            chase.paused = true;
        //        } else {
        //            chase.paused = false;
        //        }

        /*Ghost Path Code*/

        if (forward) {
            if (p < .99) {
                p += .01;
            } else {
                forward = false;
            }
        } else {
            if (p > 0) {
                p -= .01;
            } else {
                forward = true;
            }
        }
        p = (Math.round(p * 100) / 100);

        var g;
        for (g = 0; g < ghosts.length; g++) {
            var ghost = ghosts[g];
            if (ghost.type % 10 <= 3) {
                if (ghost.points.length > 1) {
                    var scaledP,
                        r = {
                            x: ghost.obj.x,
                            y: ghost.obj.y
                        };
                    if (ghost.loop) {
                        if (forward) {
                            scaledP = p * (ghost.points.length);
                        } else {
                            scaledP = (1 - p) * (ghost.points.length);
                        }
                        if (scaledP < (ghost.points.length - 1)) {
                            //                        console.log({
                            //                            i: Math.floor(scaledP),
                            //                            p: (scaledP - Math.floor(scaledP))
                            //                        });
                            r = lerp(ghost.points[Math.floor(scaledP)], ghost.points[Math.floor(scaledP + 1)], scaledP - Math.floor(scaledP));
                        } else if (scaledP < ghost.points.length) {
                            //                        console.log({
                            //                            i: Math.floor(scaledP),
                            //                            p: (scaledP - Math.floor(scaledP)),
                            //                            z: true
                            //                        });
                            r = lerp(ghost.points[Math.floor(scaledP)], ghost.points[0], scaledP - Math.floor(scaledP));
                        }
                    } else {
                        var scaledP = p * (ghost.points.length - 1);
                        var a = ghost.points[Math.floor(scaledP)],
                            b = ghost.points[Math.floor(scaledP) + 1];
                        var scalar = scaledP - Math.floor(scaledP);

                        r = lerp(a, b, scalar);
                    }
                    p = (Math.round(p * 100) / 100);


                    if (ghost.alive) {
                        ghost.obj.x = r.x;
                        ghost.obj.y = r.y;
                    }
                }
            } else {
                var scaledP = (((player.obj.x > 0) ? player.obj.x : 1) / WIDTH) * (ghost.points.length - 1);
                var a = ghost.points[Math.floor(scaledP)],
                    b = ghost.points[Math.floor(scaledP) + 1];
                var scalar = scaledP - Math.floor(scaledP);
                var r = lerp(a, b, scalar);

                if (ghost.alive) {
                    ghost.obj.x = r.x;
                    ghost.obj.y = r.y;
                }

            }


        }

        if (J_DOWN && !cheated) {
            cheated = true;
            player.bullets = 100;
            bulletLabel.text = "Bullets Left: " + player.bullets;
        }

        if (L_SHIFT_DOWN) {
            player.movementSpeed = 30;
        } else {
            player.movementSpeed = 10;
        }
        var p_bnd = player.obj.getBounds();
        if ((A_DOWN || LEFT_DOWN) && !(D_DOWN || RIGHT_DOWN)) {
            if (player.obj.x >= (p_bnd.width/2)) {
                player.obj.x -= player.movementSpeed;
            } else {
                player.x = 0;
                player.obj.x = 0;
            }
        } else if (!(A_DOWN || LEFT_DOWN) && (D_DOWN || RIGHT_DOWN)) {
            if (player.obj.x < (WIDTH-(p_bnd.width/2 ))) {
                player.obj.x += player.movementSpeed;
            } else {
                player.obj.x = (WIDTH-1);
            }
        }

        if (SPACE_DOWN && player.shootDelay === 0 && player.bullets > 0) {
            var blt = new createjs.Shape();
            blt.graphics.beginFill('#a00').drawRect(0, 0, 6, 10);
            blt.setBounds(0, 0, 6, 10); //replaced when sprites and images implemented
            var bb = blt.getBounds();
            // blt.x = (player.obj.x + (player.obj.getBounds().width / 2) - (bb.width / 2));
            blt.x = player.obj.x - (bb.width / 2);
            blt.y = player.obj.y - 5;
            stage.addChild(blt);
            bullets.push(blt);
            player.shootDelay = DELAY_SHOT;
            player.bullets--;
            bulletLabel.text = "Bullets Left: " + player.bullets;
        }

        player.shootDelay -= ((player.shootDelay === 0) ? 0 : 1);

        /*don't forget bullets*/

        var b;
        for (b = 0; b < bullets.length; b++) {
            var blt = bullets[b];
            blt.y -= BULLET_VELOCITY; //negative because moving towards the top, ie towards 0
            if (blt.y <= 0) {
                stage.removeChild(blt);
                bullets.splice(b, 1);
            } else {
                var w;
                for (w = 0; w < levels[current_level].walls.length; w++) {
                    var wall = levels[current_level].walls[w];
                    var pt = blt.localToLocal(3, 2, wall.obj);
                    if (wall.obj.hitTest(pt.x, pt.y)) {
                        stage.removeChild(blt);
                        bullets.splice(b, 1);
                    }
                }
                //ensure the bullet still exists after wall test
                if (bullets.indexOf(blt) != -1) {
                    var g;
                    for (g = 0; g < ghosts.length; g++) {
                        var ghost = ghosts[g];
                        var pt = blt.localToLocal(3, 2, ghost.obj);
                        if (ghost.obj.hitTest(pt.x, pt.y)) {
                            stage.removeChild(blt);

                            if (ghost.alive) {
                                tempScore += 10;
                                scoreLabel.text = "Score: " + tempScore;
                            }

                            bullets.splice(b, 1);
                            if (ghost.type < 20 || ghost.type > 40) {
                                ghost.alive = false;
                                ghost.obj.alpha = 0.5;
                                if (firstHit) {
                                    firstHit = false;
                                    if (Math.floor(ghost.type / 10) === 1) {
                                        player.lives++;
                                        livesLabel.text = "Lives Left: " + player.lives;
                                    }
                                    //do something special for the health bonus
                                }
                            } else {
                                var replacement = null;
                                switch (Math.floor(ghost.type / 10)) {
                                case 2:
                                    replacement = new Ghost(ghost.type - 20, ghost.loop, ghost.points);
                                    ghosts[g] = replacement;
                                    break;
                                case 3:
                                    replacement = new Ghost(ghost.type - 10, ghost.loop, ghost.points);
                                    ghosts[g] = replacement;
                                    break;
                                }
                                replacement.obj.x = ghost.obj.x;
                                replacement.obj.y = ghost.obj.y;
                                stage.addChild(replacement.path);
                                stage.addChild(replacement.obj);
                                stage.removeChild(ghost.obj);
                                stage.removeChild(ghost.path);
                            }
                        }
                    }
                }
            }
        }

        var g, levelComplete = true;
        for (g = 0; g < ghosts.length; g++) {
            if (levelComplete) {
                //if even one ghost is alive, this will trigger levelcomplete to be false
                levelComplete = !ghosts[g].alive;
            }
        }
        if (levelComplete) {
            player.score = tempScore + 100 + ((!cheated) ? (player.bullets * 10) : 0);
            scoreLabel.text = "Score: " + tempScore;
            gamestate = LEVELUP;
        } else if (bullets.length === 0 && player.bullets === 0) {
            gamestate = LEVELFAILED;
        }

        if(paused){
            gamestate = PAUSED;
            locker = true;
        }
        break;
    case PAUSED:
        if(locker){
            pauseScreen.visible = true;
            mainMenu.visible = true;
            retry.visible = true;
            resume.visible = true;
            stage.setChildIndex(pauseScreen, stage.getNumChildren()-1);
            stage.setChildIndex(mainMenu, stage.getNumChildren()-1);
            stage.setChildIndex(resume, stage.getNumChildren()-1);
            stage.setChildIndex(retry, stage.getNumChildren()-1);
            stage.setChildIndex(livesLabel, stage.getNumChildren()-1);
            stage.setChildIndex(bulletLabel, stage.getNumChildren()-1);
            stage.setChildIndex(scoreLabel, stage.getNumChildren()-1);
            locker = false;
        }
        if(!paused){
            pauseScreen.visible = false;
            mainMenu.visible = false;
            retry.visible = false;
            resume.visible = false;
            gamestate = RUN;   
        }
        break;
    case LEVELUP:
        //set delay, then execute
        if( levelup_timer === Math.floor(levelup_delay * .33)){
            teardown();
            levelupimg.visible = true;
            levelsign = new createjs.Text("Level " + (current_level+1) + " complete!", "64px bonehead", "#F80");
            var bnds = levelsign.getBounds();
            levelsign.x = (WIDTH - bnds.width)/2;
            levelsign.y = (HEIGHT - bnds.height)/2;
            stage.addChild(levelsign);
        }
        if (levelup_timer === levelup_delay) {
            locker = true;
            levelup_timer = 0;
            if (current_level + 1 === levels.length) {
                gamestate = WIN;
            } else {
                // teardown();
                current_level++;
                setup();
                gamestate = RUN;
            }
        } else {
            levelup_timer++;
        }
        break;
    case LEVELFAILED:
        if (levelup_timer === levelup_delay) {
            levelup_timer = 0;
            teardown();
            frameCount = 0;
            running = false;
            gameoverScreen.visible = true;
            mainMenu.visible = true;
            if (player.lives > 1) {
                retry.visible = true;
            }
            gamestate = HOLD;
        } else {
            levelup_timer++;
        }
        break;
    case RETRYLEVEL:
        pauseScreen.visible = false;
        mainMenu.visible = false;
        resume.visible = false;
        gameoverScreen.visible = false;
        mainMenu.visible = false;
        retry.visible = false;
        player.lives--;
        //        locker = true;
        setup();
        gamestate = RUN;
        break;
    case GAMEOVER:
        //console.error("GAMEOVER");
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
    case WIN:
        //alert("YOU WIN!");
        //console.error("YOU WIN!");
        //        timer.text = "";
        //        gameTimer = 0;
        stage.removeChild(levelsign);
        levelupimg.visible = false;
        stage.removeChild(scoreLabel);
        scoreLabel = new createjs.Text("WINNER! Your Score was " + player.score + "!", "40px bonehead", "#F80");
        var b = scoreLabel.getBounds();
        scoreLabel.x = (WIDTH - b.width) / 2;
        scoreLabel.y = (HEIGHT - b.height) / 2;
        stage.addChild(scoreLabel);
        frameCount = 0;
        running = false;
        gameoverScreen.visible = true;
        mainMenu.visible = true;
        //        tutorial.visible = true;
        //        createjs.Sound.stop();
        //        if (!muted) {
        //            createjs.Sound.play("loser");
        //        }
        gamestate = HOLD;
        break;
    default:
        console.error("BORKED");
        break;
    }
    stage.update();
}