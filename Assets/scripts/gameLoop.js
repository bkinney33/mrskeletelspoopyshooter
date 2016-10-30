var tempScore = 0;

function toFixed(num, precision) {
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

function setup() {
    paused = false;
    stage.removeChild(levelsign);
    levelupimg.visible = false;
    tempScore = player.score;
    player.obj.visible = true;
    ground.visible = true;
    cheated = false;
    firstHit = true;
    forward = true;
    labels = new createjs.Container();
    p = 0;
    var i;
    if (levels[current_level].labels.length > 0) {
        for (i = 0; i < levels[current_level].labels.length; i++) {
            var lab = levels[current_level].labels[i];
            var bnd = lab.obj.getBounds();
            lab.obj.x = (WIDTH - bnd.width) * lab.x;
            lab.obj.y = (HEIGHT - bnd.height) * lab.y;

            var shadow = new createjs.Text(lab.obj.text, lab.obj.font, "#FFF");

            shadow.color = "#000";
            shadow.outline = 5;
            bnd = shadow.getBounds();
            shadow.x = (WIDTH - bnd.width) * lab.x;
            shadow.y = (HEIGHT - bnd.height) * lab.y;
            labels.addChild(shadow);
            labels.addChild(lab.obj);
        }
        stage.addChild(labels);
    }
    ghosts = [];
    for (i = 0; i < levels[current_level].ghosts.length; i++) {
        ghosts.push(levels[current_level].ghosts[i]);
        ghosts[i].p = 0;
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

    stage.setChildIndex(muteButton, stage.getNumChildren() - 1);
}

function teardown() {
    player.obj.visible = false;
    player.laser.visible = false;
    ground.visible = false;
    stage.removeChild(labels);
    labels = null;
    var i = 0;

    //    for (i = 0; i < stage.getNumChildren(); i++) {
    //        console.log(stage.getChildAt(i));
    //    }

    if (ghosts) {
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


    bulletLabel.text = "";
    levelLabel.text = "";
    livesLabel.text = "";
}

function gameLoop() {
    if (muted) {
        createjs.Sound.volume = 0;
    } else {
        createjs.Sound.volume = 1;
    }
    switch (gamestate) {
    case INIT:
        console.log("INIT");
        menuMusic.play({
            loop: -1
        });
        player.score = 0;
        ground = new createjs.Shape();
        var gWidth = (WIDTH * 1.5);
        ground.graphics.beginFill("#151515").drawRect(0, 0, gWidth, (500));
        ground.y = HEIGHT - groundHeight;
        ground.x = (WIDTH - (gWidth)) / 2;
        stage.addChild(ground);
        ground.visible = false;
        var size = 25;
        player.obj = new createjs.Sprite(player._SpriteSheet);
        player.obj.gotoAndPlay("idle");
        stage.addChild(player.obj);
        player.obj.x = WIDTH / 2;
        player.obj.y = (HEIGHT - groundHeight);
        player.obj.visible = false;
        player.laser = new createjs.Shape();
        player.laser.graphics.beginFill("#f00").drawRect(-1, -HEIGHT, 2, HEIGHT);
        player.laser.y = (player.obj.y - player.obj.getBounds().height) - 10;
        player.laser.visible = false;
        stage.addChild(player.laser);
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
        if (muted) {
            menuMusic.paused = true;
        } else {
            menuMusic.paused = false;
        }
        break;
    case RUN:
        if (locker) {
            setup();
            loopMusic.play({
                loop: -1
            });
            locker = false;
        }
        if (muted) {
            loopMusic.paused = true;
        } else {
            loopMusic.paused = false;
        }

        /*Ghost Path Code*/

        //        if (forward) {
        //            if (p < .99) {
        //                p += .01;
        //            } else {
        //                forward = false;
        //            }
        //        } else {
        //            if (p > 0) {
        //                p -= .01;
        //            } else {
        //                forward = true;
        //            }
        //        }
        //        p = (Math.round(p * 100) / 100);

        var g;
        for (g = 0; g < ghosts.length; g++) {
            var ghost = ghosts[g];

            if (ghost.forward) {
                if (ghost.p < .99) {
                    ghost.p += ghost.speed * .01;
                } else {
                    ghost.forward = false;
                }
            } else {
                if (ghost.p > 0) {
                    ghost.p -= ghost.speed * .01;
                } else {
                    ghost.forward = true;
                }
            }

            ghost.p = parseFloat(toFixed(ghost.p, 3));

            if (ghost.type % 10 <= 3) {
                if (ghost.points.length > 1) {
                    var scaledP,
                        r = {
                            x: ghost.obj.x,
                            y: ghost.obj.y
                        };
                    if (ghost.loop) {
                        if (ghost.forward) {
                            scaledP = ghost.p * (ghost.points.length);
                        } else {
                            scaledP = (1 - ghost.p) * (ghost.points.length);
                        }
                        if (scaledP < (ghost.points.length - 1)) {
                            r = lerp(ghost.points[Math.floor(scaledP)], ghost.points[Math.floor(scaledP + 1)], scaledP - Math.floor(scaledP));
                        } else if (scaledP < ghost.points.length) {
                            r = lerp(ghost.points[Math.floor(scaledP)], ghost.points[0], scaledP - Math.floor(scaledP));
                        }
                    } else {
                        var scaledP = ghost.p * (ghost.points.length - 1);
                        var a = ghost.points[Math.floor(scaledP)],
                            b = ghost.points[Math.floor(scaledP) + 1];
                        var scalar = scaledP - Math.floor(scaledP);

                        r = lerp(a, b, scalar);
                    }

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
            player.obj.scaleX = -1;
            if (!player.moving) {
                player.moving = true;
                player.obj.gotoAndPlay("walk");
            }
            if (player.obj.x >= (p_bnd.width / 2)) {
                player.obj.x -= player.movementSpeed;
            } else {
                player.x = 0;
                player.obj.x = 0;
            }
        } else if (!(A_DOWN || LEFT_DOWN) && (D_DOWN || RIGHT_DOWN)) {
            player.obj.scaleX = 1;
            if (!player.moving) {
                player.moving = true;
                player.obj.gotoAndPlay("walk");
            }
            if (player.obj.x < (WIDTH - (p_bnd.width / 2))) {
                player.obj.x += player.movementSpeed;
            } else {
                player.obj.x = (WIDTH - 1);
            }
        } else {
            if (player.shootDelay < (DELAY_SHOT - 5)) {
                player.obj.gotoAndPlay("idle");
            }
            player.moving = false;
        }


        player.laser.x = player.obj.x;
        if ((S_DOWN || DOWN_DOWN) && !player.laser.visible) {
            console.log("Lazer beam!");
            tempScore = (tempScore > 20) ? (tempScore - 20) : 0;
            scoreLabel.text = "Score: " + tempScore;
            player.laser.visible = true;
        } else if (!(S_DOWN || DOWN_DOWN) && player.laser.visible) {
            player.laser.visible = false;
        }

        if ((SPACE_DOWN || W_DOWN || UP_DOWN) && player.shootDelay === 0 && player.bullets > 0) {
            player.obj.gotoAndPlay("shoot");
            var blt = doot.clone();
            var bb = blt.getBounds();
            blt.x = player.obj.x - (bb.width / 2);
            blt.y = (player.obj.y - player.obj.getBounds().height) - 5;
            stage.addChild(blt);
            bullets.push(blt);
            player.shootDelay = DELAY_SHOT;
            player.bullets--;
            bulletLabel.text = "Bullets Left: " + player.bullets;
        }

        player.shootDelay -= ((player.shootDelay === 0) ? 0 : 1);

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

                        //console.log(ndgmr.checkPixelCollision(blt, ghost, .5, true));

                        if (ghost.obj.hitTest(pt.x, pt.y)) {
                            stage.removeChild(blt);
                            if (ghost.alive) {
                                tempScore += 10;
                                scoreLabel.text = "Score: " + tempScore;
                            }
                            bullets.splice(b, 1);
                            if (ghost.type < 20 || ghost.type > 40) {
                                ghost.alive = false;
                                ghost.obj.gotoAndPlay("dead");
                                ghost.obj.alpha = 0.5;
                                if (firstHit) {
                                    firstHit = false;
                                    if (Math.floor(ghost.type / 10) === 1) {
                                        player.lives++;
                                        livesLabel.text = "Lives Left: " + player.lives;
                                    }
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
                                replacement.p = ghost.p;
                                replacement.path = ghost.path;
                                replacement.forward = ghost.forward;
                                replacement.speed = ghost.speed;
                                replacement.obj.x = ghost.obj.x;
                                replacement.obj.y = ghost.obj.y;
                                stage.addChild(replacement.obj);
                                replacement.obj.currentFrame = ghost.obj.currentFrame;
                                stage.removeChild(ghost.obj);
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

        if (paused) {
            gamestate = PAUSED;
            locker = true;
        }

        if (DEVMODE) {
            gamestate = LEVELUP;
            teardown();
            levelup_timer = levelup_delay;
            DEVMODE = false;
        }
        break;
    case PAUSED:
        if (locker) {
            pauseScreen.visible = true;
            mainMenu.visible = true;
            retry.visible = true;
            resume.visible = true;
            stage.setChildIndex(pauseScreen, stage.getNumChildren() - 1);
            stage.setChildIndex(mainMenu, stage.getNumChildren() - 1);
            stage.setChildIndex(resume, stage.getNumChildren() - 1);
            stage.setChildIndex(retry, stage.getNumChildren() - 1);
            stage.setChildIndex(livesLabel, stage.getNumChildren() - 1);
            stage.setChildIndex(bulletLabel, stage.getNumChildren() - 1);
            stage.setChildIndex(scoreLabel, stage.getNumChildren() - 1);
            locker = false;
        }
        if (!paused) {
            pauseScreen.visible = false;
            mainMenu.visible = false;
            retry.visible = false;
            resume.visible = false;
            gamestate = RUN;
        }
        break;
    case LEVELUP:
        //set delay, then execute
        if (levelup_timer === Math.floor(levelup_delay * .33)) {
            teardown();
            levelupimg.visible = true;
            levelsign = new createjs.Text("Level " + (current_level + 1) + " complete!", "64px bonehead", "#F80");
            var bnds = levelsign.getBounds();
            levelsign.x = (WIDTH - bnds.width) / 2;
            levelsign.y = (HEIGHT - bnds.height) / 2;
            stage.addChild(levelsign);
        }
        if (levelup_timer === levelup_delay) {
            locker = true;
            levelup_timer = 0;
            if (current_level + 1 === levels.length) {
                gamestate = WIN;
            } else {
                current_level++;
                gamestate = RUN;
            }
        } else {
            levelup_timer++;
        }
        break;
    case LEVELFAILED:
        if (levelup_timer === 0) {
            loopMusic.stop();
            loser.play();
        }
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
        locker = true;
        teardown();
        gamestate = RUN;
        break;
    case GAMEOVER:
        //console.error("GAMEOVER");
        loopMusic.stop();
        loser.play();
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
        loopMusic.stop();
        loser.play();
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