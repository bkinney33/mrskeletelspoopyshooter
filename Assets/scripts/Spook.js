(function (window) {
    Ghost = function () {
        this.initialize();
    }
    Ghost._SpriteSheet = new createjs.SpriteSheet({
        images: ["Assets/images/Spook.png"],
        frames: [[0, 0, 37, 66, 0, -262.35, -159.45], [37, 0, 31, 71, 0, -268.35, -159.45], [68, 0, 37, 68, 0, -262.35, -159.45], [0, 71, 31, 72, 0, -268.35, -159.45], [31, 71, 31, 66, 0, -268.35, -159.45], [62, 71, 37, 67, 0, -262.35, -159.45], [0, 0, 37, 66, 0, -262.35, -159.45], [37, 0, 31, 71, 0, -268.35, -159.45], [68, 0, 37, 68, 0, -262.35, -159.45], [0, 71, 31, 72, 0, -268.35, -159.45], [0, 143, 31, 66, 0, -268.35, -159.45], [62, 71, 37, 67, 0, -262.35, -159.45], [62, 71, 37, 67, 0, -262.35, -159.45], [31, 143, 37, 66, 0, -262.35, -159.45]]
    });
    var Ghost_p = Ghost.prototype = new createjs.Sprite();
    Ghost_p.Sprite_initialize = Ghost_p.initialize;
    Ghost_p.initialize = function () {
        this.Sprite_initialize(Ghost._SpriteSheet);
        this.paused = false;
    }
    window.Ghost = Ghost;
}(window));