function runGameTimer() {
    frameCount += 1;
    if (frameCount % (FPS / 10) === 0) {
        gameTimer = frameCount / (FPS);
    }
}

function lerp(p1, p2, scalar) {
    var x = (1 - scalar) * p1.x + scalar * p2.x,
        y = (1 - scalar) * p1.y + scalar * p2.y,
        result = new Point(Math.round(x), Math.round(y));
    return result;
}

function setup() {
    //    if (current_level === 0) {
    //        
    //    }

    player.obj.visible = true;
    ground.visible = true;

    cheated = false;
    firstHit = true;
    forward = true;

    p = 0;
    var i;
    //draw paths first, so all ghosts will overlap any path
    for (i = 0; i < levels[current_level].ghosts.length; i++) {
        stage.addChild(levels[current_level].ghosts[i].path);
    }

    for (i = 0; i < levels[current_level].ghosts.length; i++) {
        levels[current_level].ghosts[i].alive = true;
        levels[current_level].ghosts[i].obj.alpha = 1;
        stage.addChild(levels[current_level].ghosts[i].obj);
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
    bulletLabel.x = 10;
    bulletLabel.y = (b.height - bb.height);

    livesLabel.text = "Lives Left: " + player.lives;
    bb = livesLabel.getBounds();
    livesLabel.x = (WIDTH - bb.width) - 10;
    livesLabel.y = (b.height - bb.height);
}

function teardown() {
    player.obj.visible = false;
    ground.visible = false;
    var i = 0;
    for (i = 0; i < levels[current_level].ghosts.length; i++) {
        stage.removeChild(levels[current_level].ghosts[i].obj);
        stage.removeChild(levels[current_level].ghosts[i].path);
    }
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
    switch (gamestate) {
    case INIT:
        console.error("INIT");

        bulletLabel = new createjs.Text("", "24px Arial", "#FFF");
        levelLabel = new createjs.Text("", "32px Arial", "#FFF");
        livesLabel = new createjs.Text("", "24px Arial", "#FFF");
        stage.addChild(bulletLabel);
        stage.addChild(levelLabel);
        stage.addChild(livesLabel);

        ground = new createjs.Shape();
        var gWidth = WIDTH + 2;
        ground.graphics.beginFill("#573c00").beginStroke("#060").setStrokeStyle(2).drawRect(0, 0, gWidth, 50);
        ground.y = HEIGHT - 25;
        ground.x = (WIDTH - (gWidth)) / 2;
        stage.addChild(ground);
        ground.visible = false;

        var size = 25;
        player.obj = new createjs.Shape();
        player.obj.graphics.beginFill("#FFF").drawRect(0, 0, size, size);
        stage.addChild(player.obj);
        player.obj.x = (WIDTH - size) / 2;
        player.obj.y = (HEIGHT - 27) - (size);
        player.obj.setBounds(0, 0, size, size);
        player.obj.visible = false;

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
        for (g = 0; g < levels[current_level].ghosts.length; g++) {
            var ghost = levels[current_level].ghosts[g];
            if (ghost.points.length > 1) {
                p = (Math.round(p * 100) / 100);

                var scaledP = p * (ghost.points.length - 1);
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

        if (A_DOWN && !D_DOWN) {
            if (player.obj.x >= 0) {
                player.obj.x -= player.movementSpeed;
            } else {
                player.x = 0;
                player.obj.x = 0;
            }
        } else if (D_DOWN && !A_DOWN) {
            if (player.obj.x < (WIDTH - 50)) {
                player.obj.x += player.movementSpeed;
            } else {
                player.x = (WIDTH - 50);
                player.obj.x = (WIDTH - 50);
            }
        }

        if (SPACE_DOWN && player.shootDelay === 0 && player.bullets > 0) {
            var blt = new createjs.Shape();
            blt.graphics.beginFill('#a00').drawRect(0, 0, 6, 10);
            blt.setBounds(0, 0, 6, 10); //replaced when sprites and images implemented
            var bb = blt.getBounds();
            blt.x = (player.obj.x + (player.obj.getBounds().width / 2) - (bb.width / 2));
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
                    for (g = 0; g < levels[current_level].ghosts.length; g++) {
                        var ghost = levels[current_level].ghosts[g];
                        var pt = blt.localToLocal(3, 2, ghost.obj);
                        if (ghost.obj.hitTest(pt.x, pt.y)) {
                            stage.removeChild(blt);
                            bullets.splice(b, 1);
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
                        }
                    }
                }
            }
        }

        var g, levelComplete = true;
        for (g = 0; g < levels[current_level].ghosts.length; g++) {
            if (levelComplete) {
                //if even one ghost is alive, this will trigger levelcomplete to be false
                levelComplete = !levels[current_level].ghosts[g].alive;
            }
        }
        if (levelComplete) {
            gamestate = LEVELUP;
        } else if (bullets.length === 0 && player.bullets === 0) {
            gamestate = LEVELFAILED;
        }
        break;
    case LEVELUP:
        //set delay, then execute
        locker = true;
        if (levelup_timer === levelup_delay) {
            levelup_timer = 0;
            if (current_level + 1 === levels.length) {
                teardown();
                gamestate = WIN;
            } else {
                teardown();
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
        gameoverScreen.visible = false;
        mainMenu.visible = false;
        retry.visible = false;
        player.lives--;
        locker = true;
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
        //console.error("YOU WIN!");
        //        timer.text = "";
        //        gameTimer = 0;
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
    default:
        console.error("BORKED");
        break;
    }
    stage.update();
}