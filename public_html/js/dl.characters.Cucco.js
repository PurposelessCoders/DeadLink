(function () {
    
    var SIZE = 10;
    
    var Cucco = function (x, y) {
      dl.Character(this, x, y, SIZE);
      //TODO taget the player;
      var dirX = 0;
      var dirY = 0;     
      
      //TODO LATER
      this.loadSprite();
    };
    
    dl.characters.Cucco = Cucco;
    var _cucco = Cucco.prototype;
    
    _cucco.animation = function() {
        //TODO LATER
    };
    
    _cucco.move = function() {
        this.x += this.dirX * 1 / dl.Main.FRAM_RATE;
        this.y += this.dirY * 1 / dl.Main.FRAM_RATE;
    };
    
}).call(this);