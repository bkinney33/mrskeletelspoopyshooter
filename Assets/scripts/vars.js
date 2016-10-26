var INIT = 100,
    HOLD = 200,
    RUN = 400,
    LEVELUP = 500,
    LEVELFAILED = 600,
    RETRYLEVEL = 700,
    GAMEOVER = 900,
    WIN = 1000;

var FPS = 30,
    frameCount = 0,
    gameTimer = 0,
    MAX_RUNTIME = 2 * 60; //runtime in seconds

var player = {
    lives: 3,
    movementSpeed: 10,
    obj: null,
    bnd: null,
    shootDelay: 0,
    bullets: -1
};

var ground,
    bulletLabel,
    levelLabel,
    livesLabel,
    firstHit;

var levelup_timer = 0,
    levelup_delay = 2 * FPS;

var bullets = [];

var DELAY_SHOT = 1 * FPS,
    BULLET_VELOCITY = 10;

var current_level = 0;

var forward = true,
    p = 0;

var KEYCODE_W = 87,
    KEYCODE_A = 65,
    KEYCODE_S = 83,
    KEYCODE_D = 68,
    KEYCODE_M = 77,
    KEYCODE_J = 74,
    KEYCODE_ESC = 27,
    KEYCODE_SPACE = 32,
    KEYCODE_LEFT = 37,
    KEYCODE_RIGHT = 39,
    KEYCODE_UP = 38,
    KEYCODE_DOWN = 40,
    KEYCODE_L_SHIFT = 16;
var Keys = new Object(); //makes it easier to console.log the keys by mapping them like this
Keys[87] = "W";
Keys[65] = "A";
Keys[83] = "S";
Keys[68] = "D";
Keys[77] = "M";
Keys[74] = "J";
Keys[27] = "ESC";
Keys[32] = "SPACE";
Keys[37] = "LEFT";
Keys[39] = "RIGHT";
Keys[38] = "UP";
Keys[40] = "DOWN";
Keys[16] = "L_SHIFT";

var W_DOWN = false,
    A_DOWN = false,
    S_DOWN = false,
    D_DOWN = false,
    M_DOWN = false,
    J_DOWN = false,
    ESC_DOWN = false,
    SPACE_DOWN = false,
    LEFT_DOWN = false,
    RIGHT_DOWN = false,
    UP_DOWN = false,
    DOWN_DOWN = false,
    L_SHIFT_DOWN = false;

var mouseX, mouseY;
var locker = true,
    muted = false,
    menuMusic = null; //locker is used to prevent the gameloop from calling a bit of code multiple times

//var menuMusic = createjs.Sound.createInstance("menu");
//    chase = createjs.Sound.createInstance("chase");

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Wall(x, y, width, height) {
    this.obj = new createjs.Shape();
    //    this.obj.graphics.beginFill("#aaa").drawRect(0, 0, width, height);
    var thickness = 3;
    this.obj.graphics.beginStroke("#eee").setStrokeStyle(thickness, "round").drawRoundRect(0, 0, width - (2 * thickness), height - (2 * thickness), 5);
    this.obj.x = x + thickness;
    this.obj.y = y + thickness;
}

function Ghost(size, points) {
    this.size = size;
    this.points = points;
    this.obj = new createjs.Shape();
    switch (size) {
    case -1:
        break;
    default:
        this.obj.graphics.beginFill("#FFF").drawRect(0, 0, 50, 50);
        this.obj.y = this.points[0].y - 25;
        this.obj.x = this.points[0].x - 25;
        break;
    }
    this.alive = true;
    this.forward = true;
}

function Level(bullets, ghosts, walls) {
    this.firstHit = true;
    //how many bullets are allocated for this level, will be 'inserted' into the player on level start, so the cheat only affects the player's variables
    this.bullets = bullets;
    //ghosts is the array containing all the ghosts for this level
    this.ghosts = ghosts;
    //walls is the array containing all the walls for this level
    this.walls = walls;
}

//putting the level into an array makes it easier to go from one to the next, and storing all the level information in an object makes rendering the level easier
var levels = [
//    new Level(3, [
//        new Ghost(3, [
//            new Point(100, 250),
//            new Point(700, 250)
//        ])
//    ], [
//        new Wall(0, 350, 350, 50),
//        new Wall(450, 350, 350, 50)
//    ])
    {
        bullets: 3,
        ghosts: [
            new Ghost(3, [new Point(400, 100)]),
            new Ghost(3, [new Point(100, 250), new Point(700, 250)])
//            new Ghost(3, [new Point(50, 100), new Point(50, 250), new Point(750, 250), new Point(750, 100)])
        ],
        walls: [
            new Wall(0, 350, 350, 50),
            new Wall(450, 350, 350, 50)
        ]
    }
]