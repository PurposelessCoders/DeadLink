(function () {
    
    var Character = function (x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.sprite = {};
    };
    
    dl.Character = Character;
    var _character = Character.prototype;
    
    _character.loadSprite = function () {
        //Have to be Override
    };
    
    _character.annimation = function () {
        //Have to be Override
    };
    
    _character.move = function () {
        //Have to be Override
    };

    _character.update = function () {
        this.move();
        this.annimation();
    };
    
    
}).call(this);