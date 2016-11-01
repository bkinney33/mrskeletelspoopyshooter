(function(window) {
Doot = function() {
	this.initialize();
}
Doot._SpriteSheet = new createjs.SpriteSheet({images: ["doot.png"], frames: [[0,0,156,198,0,-21.6,93.1],[156,0,152,198,0,-23.6,95.1],[308,0,160,198,0,-19.6,91.1],[0,198,158,198,0,-20.6,92.1],[158,198,152,198,0,-23.6,95.1],[310,198,146,198,0,-26.6,98.1],[0,396,142,198,0,-28.6,100.1],[0,396,142,198,0,-28.6,100.1],[142,396,150,198,0,-24.6,96.1],[292,396,158,198,0,-20.6,92.1],[292,396,158,198,0,-20.6,92.1],[0,594,156,198,0,-21.6,93.1],[156,594,158,198,0,-20.6,92.1],[314,594,158,198,0,-20.6,92.1],[0,792,158,198,0,-20.6,92.1],[158,792,162,198,0,-18.6,90.1],[320,792,144,198,0,-27.6,99.1]]});
var Doot_p = Doot.prototype = new createjs.Sprite();
Doot_p.Sprite_initialize = Doot_p.initialize;
Doot_p.initialize = function() {
	this.Sprite_initialize(Doot._SpriteSheet);
	this.paused = false;
}
window.Doot = Doot;
}(window));

