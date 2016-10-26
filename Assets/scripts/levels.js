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

function Ghost(type, loop, points) {
    this.type = type;
    this.points = points;
    this.loop = loop;
    this.scalar = 0;
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
        if (loop) {
            segment.graphics.beginStroke("#868686").setStrokeStyle(5, "round").moveTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y).lineTo(this.points[0].x, this.points[0].y).endStroke();
            this.path.addChild(segment);
        }
    }
}
var main_levels = [
    {
        bullets: 3,
        ghosts: [
//            new Ghost(1, false, [new Point(100, 100),
//                          new Point(100, 300),
//                          new Point(400, 300),
//                          new Point(400, 200),
//                          new Point(400, 300),
//                          new Point(700, 300),
//                          new Point(700, 100)])
            new Ghost(2, false, [new Point(100, 350), new Point(700, 350)])
//            new Ghost(3, false, [new Point(50, 100), new Point(50, 250), new Point(750, 250), new Point(750, 100)])
        ],
        walls: [
            new Wall(0, 450, 350, 50),
            new Wall(450, 450, 350, 50)
        ],
        labels: []
    },
    {
        bullets: 7,
        ghosts: [
            new Ghost(2, false, [new Point(700, 100), new Point(100, 100)]),
            new Ghost(2, false, [new Point(100, 200), new Point(700, 200)]),
            new Ghost(2, false, [new Point(700, 300), new Point(100, 300)]),
            new Ghost(2, false, [new Point(100, 400), new Point(700, 400)])
//            new Ghost(3, false, [new Point(50, 100), new Point(50, 250), new Point(750, 250), new Point(750, 100)])
        ],
        walls: [],
        labels: []
    }
];

var secret_levels = [
    {
        bullets: 15,
        ghosts: [
            new Ghost(1, false, [
                new Point((WIDTH * .2) - (WIDTH * .08), (HEIGHT * .25) + 100),
                new Point((WIDTH * .2) - (WIDTH * .08), (HEIGHT * .25) - 100),
                new Point((WIDTH * .2) - (WIDTH * .08), (HEIGHT * .25)),
                new Point((WIDTH * .2) + (WIDTH * .08), (HEIGHT * .25)),
                new Point((WIDTH * .2) + (WIDTH * .08), (HEIGHT * .25) - 100),
                new Point((WIDTH * .2) + (WIDTH * .08), (HEIGHT * .25) + 100)
            ]),

            new Ghost(1, false, [
                new Point((WIDTH * .4) - (WIDTH * .08), (HEIGHT * .25) + 100),
                new Point((WIDTH * .4), (HEIGHT * .25) - 100),
                new Point((WIDTH * .4) + (WIDTH * .08), (HEIGHT * .25) + 100)
            ]),

            new Ghost(1, false, [
                new Point((WIDTH * .6), (HEIGHT * .25) + 100),
                new Point((WIDTH * .6), (HEIGHT * .25) - 100),
                new Point((WIDTH * .6), (HEIGHT * .25) + 100)
                ]),
            new Ghost(1, false, [
                new Point((WIDTH * .8) - (WIDTH * .08), (HEIGHT * .25) - 100),
                new Point((WIDTH * .8) - (WIDTH * .08), (HEIGHT * .25) + 100),
                new Point((WIDTH * .8) + (WIDTH * .08), (HEIGHT * .25) + 100)
            ]),

            new Ghost(1, false, [
                new Point((WIDTH * (1 / 6)) + (WIDTH * .07), (HEIGHT * .7) - 100),
                new Point((WIDTH * (1 / 6)) - (WIDTH * .07), (HEIGHT * .7) - 100),
                new Point((WIDTH * (1 / 6)) - (WIDTH * .07), (HEIGHT * .7)),
                new Point((WIDTH * (1 / 6)) + (WIDTH * .07), (HEIGHT * .7)),
                new Point((WIDTH * (1 / 6)) + (WIDTH * .07), (HEIGHT * .7) + 100),
                new Point((WIDTH * (1 / 6)) - (WIDTH * .07), (HEIGHT * .7) + 100)
            ]),

            new Ghost(1, false, [
                new Point((WIDTH * (2 / 6)) - (WIDTH * .07), (HEIGHT * .7) + 100),
                new Point((WIDTH * (2 / 6)), (HEIGHT * .7) - 100),
                new Point((WIDTH * (2 / 6)) + (WIDTH * .07), (HEIGHT * .7) + 100)
            ]),

            new Ghost(1, false, [
                new Point((WIDTH * (3 / 6)) - (WIDTH * .07), (HEIGHT * .7) + 100),
                new Point((WIDTH * (3 / 6)) - (WIDTH * .07), (HEIGHT * .7) - 100),
                new Point((WIDTH * (3 / 6)) + (WIDTH * .07), (HEIGHT * .7) + 100),
                new Point((WIDTH * (3 / 6)) + (WIDTH * .07), (HEIGHT * .7) - 100)
            ]),

            new Ghost(1, false, [
                new Point((WIDTH * (4 / 6)), (HEIGHT * .7) + 100),
                new Point((WIDTH * (4 / 6)), (HEIGHT * .7) - 100),
                new Point((WIDTH * (4 / 6)) - (WIDTH * .07), (HEIGHT * .7) - 100),
                new Point((WIDTH * (4 / 6)) + (WIDTH * .07), (HEIGHT * .7) - 100)
            ]),

            new Ghost(1, false, [
                new Point((WIDTH * (5 / 6)) - (WIDTH * .07), (HEIGHT * .7) + 100),
                new Point((WIDTH * (5 / 6)), (HEIGHT * .7) - 100),
                new Point((WIDTH * (5 / 6)) + (WIDTH * .07), (HEIGHT * .7) + 100)
            ])
    ],
        walls: [],
        labels: []
}
];
//putting the level into an array makes it easier to go from one to the next, and storing all the level information in an object makes rendering the level easier
var demo_levels = [
    {
        bullets: 3,
        ghosts: [
//            new Ghost(2, false, [new Point(50, (HEIGHT * .75)), new Point(WIDTH - 50, (HEIGHT * .75))])
            new Ghost(2, false, [new Point((WIDTH * .5), (HEIGHT * .75))])
        ],
        walls: [],
        labels: [
            {
                obj: new createjs.Text("Welcome to Mr Skeltal's Halloween Shooter", "32px arial", "#fff"),
                x: .5,
                y: .2
            },
            {
                obj: new createjs.Text("To complete each level, kill all ghosts", "24px arial", "#fff"),
                x: .5,
                y: .4
            },
            {
                obj: new createjs.Text("without running out of bullets", "24px arial", "#fff"),
                x: .5,
                y: .45
            },
            {
                obj: new createjs.Text("(see bottom-left corner)", "24px arial", "#fff"),
                x: .5,
                y: .5
            }
        ]
    },
    {
        bullets: 5,
        ghosts: [
            new Ghost(1, false, [new Point((800 * .25), 500), new Point((800 * .25), 300)]),
            new Ghost(2, false, [new Point((800 * .5), 500), new Point((800 * .5), 300)]),
            new Ghost(3, false, [new Point((800 * .75), 500), new Point((800 * .75), 300)])
        ],
        walls: [],
        labels: [
            {
                obj: new createjs.Text("Ghosts come in 3 different sizes, and move on tracks", "32px arial", "#fff"),
                x: .5,
                y: .2
            }
        ]
    },
    {
        bullets: 2,
        ghosts: [
            new Ghost(2, true, [new Point((WIDTH / 2) - 175, (HEIGHT / 2) - 100),
                                new Point((WIDTH / 2) - 175, (HEIGHT / 2) + 100),
                                new Point((WIDTH / 2) + 175, (HEIGHT / 2) + 100),
                                new Point((WIDTH / 2) + 175, (HEIGHT / 2) - 100)])],
        walls: [],
        labels: [
            {
                obj: new createjs.Text("Some tracks loop!", "32px arial", "#FFF"),
                x: .5,
                y: .5
            }
        ]
            },
    {
        bullets: 3,
        ghosts: [
            new Ghost(2, false, [
                new Point(100, 200),
                new Point(100, 400),
                new Point(400, 400),
                new Point(400, 250),
                new Point(400, 400),
                new Point(700, 400),
                new Point(700, 200)])
        ],
        walls: [],
        labels: [
            {
                obj: new createjs.Text("As you progress, tracks will get harder", "32px arial", "#FFF"),
                x: .5,
                y: .3
            }
        ]
    },
    {
        bullets: 5,
        ghosts: [
            new Ghost(1, false, [new Point(400, (HEIGHT * .3))]),
            new Ghost(3, false, [new Point(100, 350), new Point(700, 350)])
//            new Ghost(3, false, [new Point(50, 100), new Point(50, 250), new Point(750, 250), new Point(750, 100)])
        ],
        walls: [
            new Wall(0, 450, 350, 50),
            new Wall(450, 450, 350, 50)
        ],
        labels: [
            {
                obj: new createjs.Text("Some levels have walls which block your shots", "32px Arial", "#fff"),
                x: .5,
                y: .15
            },
            {
                obj: new createjs.Text("be sure to plan ahead!", "32px Arial", "#fff"),
                x: .5,
                y: .20
            }
        ]
    },
    {
        bullets: 3,
        ghosts: [
            new Ghost(13, false, [new Point(WIDTH * .5, HEIGHT * .5)]),
            new Ghost(2, false, [new Point(WIDTH * .33, HEIGHT * .66), new Point(WIDTH * .66, HEIGHT * .66)])
        ],
        walls: [],
        labels: [
            {
                obj: new createjs.Text("If you lost a life, don't worry!", "32px Arial", "#fff"),
                x: .5,
                y: .15
            },
            {
                obj: new createjs.Text("Some ghosts grant 1UP when shot first!", "32px Arial", "#fff"),
                x: .5,
                y: .20
            }]
    }
]