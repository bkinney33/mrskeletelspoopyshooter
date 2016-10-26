function Point(x, y) {
    this.x = x;
    this.y = y;
}

function Wall(x, y, width, height) {
    this.obj = new createjs.Shape();
    var thickness = 3;
    this.obj.graphics.beginStroke("#eee").beginFill("#212121").setStrokeStyle(thickness, "round").drawRoundRect(0, 0, width - (2 * thickness), height - (2 * thickness), 5);
    this.obj.x = x + thickness;
    this.obj.y = y + thickness;
}

function Ghost(type, points) {
    this.type = type;
    this.points = points;
    this.obj = new createjs.Shape();
    var size;
    switch (type % 10) {
    case -1:
        break;
    case 1:
        this.obj.graphics.beginFill((Math.floor(type / 10) == 1) ? "#9fd3ff" : "#FFF").drawRect(-12, -12, 24, 24);
        this.obj.y = this.points[0].y;
        this.obj.x = this.points[0].x;
        break;
    case 2:
        this.obj.graphics.beginFill((Math.floor(type / 10) == 1) ? "#9fd3ff" : "#FFF").drawRect(-25, -25, 50, 50);
        this.obj.y = this.points[0].y;
        this.obj.x = this.points[0].x;
        break;
    case 3:
        this.obj.graphics.beginFill((Math.floor(type / 10) == 1) ? "#9fd3ff" : "#FFF").drawRect(-40, -25, 80, 50);
        this.obj.y = this.points[0].y;
        this.obj.x = this.points[0].x;
        break;
    default:
        this.obj.graphics.beginFill((Math.floor(type / 10) == 1) ? "#9fd3ff" : "#FFF").drawRect(-25, -25, 50, 50);
        this.obj.y = this.points[0].y;
        this.obj.x = this.points[0].x;
        break;
    }
    this.alive = true;
    this.forward = true;
    if (this.points.length > 1) {
        this.path = new createjs.Container();
        var i;
        for (i = 0; i < this.points.length - 1; i++) {
            var segment = new createjs.Shape();
            segment.graphics.beginStroke("#868686").setStrokeStyle(5, "round").moveTo(this.points[i].x, this.points[i].y).lineTo(this.points[i + 1].x, this.points[i + 1].y).endStroke();
            this.path.addChild(segment);
        }
    }
}

//putting the level into an array makes it easier to go from one to the next, and storing all the level information in an object makes rendering the level easier
var levels = [
    {
        bullets: 3,
        ghosts: [
            new Ghost(2, [new Point(100, 300), new Point(700, 300)])
        ],
        walls: []
    },
    {
        bullets: 3,
        ghosts: [
            new Ghost(2, [new Point(100, 100),
                          new Point(100, 300),
                          new Point(400, 300),
                          new Point(400, 200),
                          new Point(400, 300),
                          new Point(700, 300),
                          new Point(700, 100)])
        ],
        walls: []
    },
    {
        bullets: 10,
        ghosts: [
            new Ghost(2, [new Point(700, 100), new Point(100, 100)]),
            new Ghost(2, [new Point(100, 200), new Point(700, 200)]),
            new Ghost(2, [new Point(700, 300), new Point(100, 300)]),
            new Ghost(2, [new Point(100, 400), new Point(700, 400)])
//            new Ghost(3, [new Point(50, 100), new Point(50, 250), new Point(750, 250), new Point(750, 100)])
        ],
        walls: []
    },
    {
        bullets: 5,
        ghosts: [
            new Ghost(2, [new Point(100, 100),
                          new Point(100, 300),
                          new Point(400, 300),
                          new Point(400, 200),
                          new Point(400, 300),
                          new Point(700, 300),
                          new Point(700, 100)])
//            new Ghost(2, [new Point(100, 350), new Point(700, 350)])
//            new Ghost(3, [new Point(50, 100), new Point(50, 250), new Point(750, 250), new Point(750, 100)])
        ],
        walls: [
            new Wall(0, 450, 350, 50),
            new Wall(450, 450, 350, 50)
        ]
    },
    {
        bullets: 5,
        ghosts: [
            new Ghost(13, [new Point(400, 100)]),
            new Ghost(1, [new Point(100, 350), new Point(700, 350)])
//            new Ghost(3, [new Point(50, 100), new Point(50, 250), new Point(750, 250), new Point(750, 100)])
        ],
        walls: [
            new Wall(0, 450, 350, 50),
            new Wall(450, 450, 350, 50)
        ]
    }
]