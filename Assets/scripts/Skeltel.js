(function (window) {
    skeltel = function () {
        this.initialize();
    }
    skeltel._SpriteSheet = new createjs.SpriteSheet({
        images: ["Assets/images/Skeltel.png"],
        frames: [[0, 0, 51, 73, 0, -294.25, -221.55], [51, 0, 51, 73, 0, -294.25, -221.55], [102, 0, 51, 73, 0, -294.25, -221.55], [153, 0, 51, 73, 0, -294.25, -221.55], [204, 0, 51, 73, 0, -294.25, -221.55], [0, 73, 51, 74, 0, -294.25, -221.55], [51, 73, 51, 74, 0, -294.25, -221.55], [102, 73, 51, 74, 0, -294.25, -221.55], [153, 73, 51, 74, 0, -294.25, -221.55], [204, 73, 51, 74, 0, -294.25, -221.55], [0, 147, 51, 74, 0, -294.25, -221.55], [51, 147, 51, 74, 0, -294.25, -221.55], [102, 147, 51, 73, 0, -294.25, -221.55], [153, 147, 51, 73, 0, -294.25, -221.55], [204, 147, 51, 73, 0, -294.25, -221.55]]
    });
    var skeltel_p = skeltel.prototype = new createjs.Sprite();
    skeltel_p.Sprite_initialize = skeltel_p.initialize;
    skeltel_p.initialize = function () {
        this.Sprite_initialize(skeltel._SpriteSheet);
        this.paused = false;
    }
    window.skeltel = skeltel;
}(window));