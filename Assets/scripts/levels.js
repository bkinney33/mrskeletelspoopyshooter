//Point object definition is in vars.js

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
    var color = "#FFF";
    switch (Math.floor(type / 10)) {
    case 0:
        color = "#FFF";
        break;
    case 1:
        color = "#9fd3ff";
        break;
    case 2:
        color = "#fffa82";
        break;
    case 3:
        color = "#ffaa6d";
        break;
    default:
        color = "#FFF";
        break;
    }

    switch (type % 10) {
    case -1:
        break;
    case 1:
    case 4:
        this.obj.graphics.beginFill(color).drawRect(-12, -12, 24, 24);
        this.obj.y = this.points[0].y;
        this.obj.x = this.points[0].x;
        break;
    case 2:
    case 5:
        this.obj.graphics.beginFill(color).drawRect(-25, -25, 50, 50);
        this.obj.y = this.points[0].y;
        this.obj.x = this.points[0].x;
        break;
    case 3:
    case 6:
        this.obj.graphics.beginFill(color).drawRect(-40, -25, 80, 50);
        this.obj.y = this.points[0].y;
        this.obj.x = this.points[0].x;
        break;
    default:
        this.obj.graphics.beginFill(color).drawRect(-25, -25, 50, 50);
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
            new Ghost(2, false, [
                new Point(100, (HEIGHT * .5)), new Point(700, (HEIGHT * .5))
            ])
        ],
        walls: [],
        labels: [
            {
                obj: new createjs.Text("To complete each level, kill all ghosts", "24px arial", "#fff"),
                x: .5,
                y: .25
            },
            {
                obj: new createjs.Text("Use A & D or the Arrow Keys to move Left and Right", "24px arial", "#fff"),
                x: .5,
                y: .35
            },
            {
                obj: new createjs.Text("Press SPACE to fire bullets", "24px arial", "#fff"),
                x: .5,
                y: .65
            },
            {
                obj: new createjs.Text("(Be careful, you have a limited amount!)", "24px arial", "#fff"),
                x: .5,
                y: .75
            }
        ]
    },
    {
        bullets: 6,
        ghosts: [
            new Ghost(2, false, [new Point((WIDTH * .75), 100), new Point((WIDTH * .25), 100)]),
            new Ghost(2, false, [new Point((WIDTH * .25), 200), new Point((WIDTH * .75), 200)]),
            new Ghost(2, false, [new Point((WIDTH * .75), 300), new Point((WIDTH * .25), 300)]),
            new Ghost(2, false, [new Point((WIDTH * .25), 400), new Point((WIDTH * .75), 400)])
        ],
        walls: [],
        labels: []
    },
    {
        bullets: 6,
        ghosts: [
            new Ghost(2, false, [
                new Point((WIDTH * .3), (HEIGHT * .13)),
                new Point((WIDTH * .4), (HEIGHT * .13)),
                new Point((WIDTH * .4), (HEIGHT * .23)),
                new Point((WIDTH * .5), (HEIGHT * .23)),
                new Point((WIDTH * .6), (HEIGHT * .23)),
                new Point((WIDTH * .6), (HEIGHT * .13)),
                new Point((WIDTH * .7), (HEIGHT * .13))
            ]),
            new Ghost(2, false, [
                new Point((WIDTH * .7), (HEIGHT * .4)),
                new Point((WIDTH * .3), (HEIGHT * .4))
            ]),
            new Ghost(2, false, [
                new Point((WIDTH * .3), (HEIGHT * .66)),
                new Point((WIDTH * .4), (HEIGHT * .66)),
                new Point((WIDTH * .4), (HEIGHT * .56)),
                new Point((WIDTH * .5), (HEIGHT * .56)),
                new Point((WIDTH * .6), (HEIGHT * .56)),
                new Point((WIDTH * .6), (HEIGHT * .66)),
                new Point((WIDTH * .7), (HEIGHT * .66))
            ])
        ],
        walls: [
            new Wall(0, 0, (WIDTH * .25), (HEIGHT - 100)),
            new Wall(3 * (WIDTH * .25), 0, (WIDTH * .25), (HEIGHT - 100)),
            new Wall((WIDTH - 60) / 2, (HEIGHT * .66), 60, 60)
        ],
        labels: []
    },
    {
        bullets: 5,
        ghosts: [
            new Ghost(3, true, [
                new Point((WIDTH * .5), 200),
                new Point((WIDTH * .75), 200),
                new Point((WIDTH * .5), 200),
                new Point((WIDTH * .25), 200)
            ]),
            new Ghost(2, true, [
                new Point((WIDTH * .25), 350),
                new Point((WIDTH * .75), 350)
                ]),
            new Ghost(1, true, [
                new Point((WIDTH * .75), 450),
                new Point((WIDTH * .25), 450)
                ])
        ],
        walls: [],
        labels: []
    },
    {
        bullets: 5,
        ghosts: [
            new Ghost(2, false, [
                new Point((WIDTH * .1), (HEIGHT * .2)),
                new Point((WIDTH * .9), (HEIGHT * .2))
            ]),
            new Ghost(2, false, [
                new Point((WIDTH * .2), (HEIGHT * .45)),
                new Point((WIDTH * .8), (HEIGHT * .45))
            ]),
            new Ghost(3, false, [
                new Point((WIDTH * .9), (HEIGHT * .7)),
                new Point((WIDTH * .1), (HEIGHT * .7))
            ])
        ],
        walls: [
            /*Splitting distance between two Y locations is ((y1 + y2) / 2) - (this.height / 2)*/
            new Wall(25, (((HEIGHT * .2) + (HEIGHT * .45)) / 2) - 20, 300, 40),
            new Wall(((WIDTH - 300)/2), (((HEIGHT * .45) + (HEIGHT * .7)) / 2) - 20, 300, 40)
        ],
        labels: []
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
                obj: new createjs.Text("If you lose a life, don't worry!", "32px Arial", "#fff"),
                x: .5,
                y: .15
            },
            {
                obj: new createjs.Text("Some ghosts grant 1UP when shot before any other ghosts!", "32px Arial", "#fff"),
                x: .5,
                y: .20
            }]
    },
    {
        bullets: 2,
        ghosts: [
            new Ghost(2, false, [
                new Point((WIDTH * .15), (HEIGHT * .5)), 
                new Point((WIDTH * .85), (HEIGHT * .5)),
                new Point((WIDTH * .15), (HEIGHT * .5)),
                new Point((WIDTH * .85), (HEIGHT * .5)),
            ])
        ],
        walls: [
            new Wall((WIDTH - 400) / 2, (HEIGHT * .6), 400, 50)
        ],
        labels: []
    },
    {
        bullets: 5,
        ghosts: [
            new Ghost(2, false, [
                new Point((WIDTH * .33), (HEIGHT * .125)),
                new Point((WIDTH * .66), (HEIGHT * .125)),
                new Point((WIDTH * .33), (HEIGHT * .125)),
                new Point((WIDTH * .66), (HEIGHT * .125))
            ]),
            new Ghost(2, true, [
                new Point(((WIDTH / 2)-50), (HEIGHT * .3) - 50),
                new Point(((WIDTH / 2)-50), (((HEIGHT * .3) - 50) + ((HEIGHT * .3) + (HEIGHT * .3)) + 50)*.5),
                new Point(((WIDTH / 2)-50), ((HEIGHT * .3) + (HEIGHT * .3)) + 50),
                new Point(((WIDTH / 2)+50), ((HEIGHT * .3) + (HEIGHT * .3)) + 50),
                new Point(((WIDTH / 2)+50), (((HEIGHT * .3) - 50) + ((HEIGHT * .3) + (HEIGHT * .3)) + 50)*.5),
                new Point(((WIDTH / 2)+50), (HEIGHT * .3) - 50),
            ]),
            new Ghost(2, false, [
                new Point((WIDTH * .66), (HEIGHT * .775)),
                new Point((WIDTH * .33), (HEIGHT * .775)),
                new Point((WIDTH * .66), (HEIGHT * .775)),
                new Point((WIDTH * .33), (HEIGHT * .775))
            ])
        ],
        walls: [
            new Wall((WIDTH - 20)/2, (HEIGHT * .3), 20, (HEIGHT * .3))
        ],
        labels: []
    },
    {
        bullets: 5,
        ghosts: [
            new Ghost(3, false, [
                new Point((WIDTH * .1), (HEIGHT * .1)),
                new Point((WIDTH * .9), (HEIGHT * .1))
            ]),
            new Ghost(2, false, [
                new Point((WIDTH * .9), (HEIGHT * .8)),
                new Point((WIDTH * .33), (HEIGHT * .8))
            ]),
            new Ghost(12, true, [
                new Point((WIDTH * .1), (HEIGHT * .25)),
                new Point((WIDTH * .9), (HEIGHT * .66))
            ])
        ],
        walls: [
            new Wall((WIDTH * .60), (HEIGHT * .25), (WIDTH * .33), 50),
            new Wall((WIDTH * .09), (HEIGHT * .6), (WIDTH * .33), 50)
        ],
        labels: []
    },
    {
        bullets: 5,
        ghosts: [
            /*3 tracking ghosts, medium -> large -> small*/
            new Ghost(5, false, [
                new Point(1,           HEIGHT * .25),
                new Point(WIDTH-1,   HEIGHT * .25)
                ]),
            new Ghost(6, false, [
                new Point(1,           HEIGHT * .475),
                new Point(WIDTH-1,   HEIGHT * .475)
                ]),
            new Ghost(14, false, [
                new Point(1,           HEIGHT * .7),
                new Point(WIDTH-1,   HEIGHT * .7)
                ])
        ],
        walls: [
            new Wall(0,                     (HEIGHT * .3625) - (25), (WIDTH * .45), 50),
            new Wall(WIDTH - (WIDTH*.45),   (HEIGHT * .3625) - (25), (WIDTH * .45), 50),
            new Wall(0,                     (HEIGHT * .5875) - (25), (WIDTH * .45), 50),
            new Wall(WIDTH - (WIDTH*.45),   (HEIGHT * .5875) - (25), (WIDTH * .45), 50)
        ],
        labels: [
            {
                obj: new createjs.Text("Some Ghosts only move with you", "32px Arial", "#fff"),
                x: .5,
                y: .15
            }]
    }
];

var demo_levels = [
    {
        bullets: 3,
        ghosts: [
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
    },
    {
        bullets: 7,
        ghosts: [
            new Ghost(32, false, [new Point(WIDTH * .33, HEIGHT * .66), new Point(WIDTH * .66, HEIGHT * .66)]),
            new Ghost(23, false, [new Point(WIDTH * .5, HEIGHT * .5)])
        ],
        walls: [],
        labels: [
            {
                obj: new createjs.Text("Some ghosts take multiple shots to kill", "32px Arial", "#fff"),
                x: .5,
                y: .15
            }]
    },
    {
        bullets: 2,
        ghosts: [
            new Ghost(15, false, [new Point(10, HEIGHT * .6), new Point(WIDTH - 10, HEIGHT * .6)])
        ],
        walls: [
            new Wall((WIDTH * .2), (HEIGHT * .7), (WIDTH * .6), 20)
        ],
        labels: [
            {
                obj: new createjs.Text("Others will move with you", "32px Arial", "#fff"),
                x: .5,
                y: .15
            }]
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