var INIT = 100,
    HOLD = 200,
    RUN = 400,
    LEVELUP = 500,
    LEVELFAILED = 600,
    RETRYLEVEL = 700,
    GAMEOVER = 900,
    WIN = 1000;

var FPS = 30,
    groundHeight = 45,
    /*DEPRECATED FOR THIS PROJECT*/
    frameCount = 0,
    gameTimer = 0,
    MAX_RUNTIME = 2 * 60; //runtime in seconds

var player = {
    score: 0,
    lives: 3,
    movementSpeed: 10,
    obj: null,
    bnd: null,
    shootDelay: 0,
    bullets: -1
};

var cheated;

var ground,
    levelLabel,
    bulletLabel,
    scoreLabel,
    livesLabel,
    firstHit;

var levelup_timer = 0,
    levelup_delay = 2 * FPS;

var bullets = [];
var levels = [],
    ghosts = [];

var DELAY_SHOT = .5 * FPS,
    BULLET_VELOCITY = 15;

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