(function () {
    
    var SIZE = 10;
    var SPEED = 10;
    
    var Link = function (x, y) {
      dl.Character(this, x, y, SIZE);
      var dirX = 0;
      var dirY = 0;
      
      //TODO LATER
      this.loadSprite();
    };
    
    dl.characters.Link = Link;
    var _link = Link.prototype;
    
    _link.animation = function() {
        //TODO LATER
    };
    
    _link.calcDirection = function () {
        this.dirX = normalize(dl.mousePos.x - this.x);
        this.dirY = normalize(dl.mousePos.y - this.y);        
    };
    
    _link.move = function() {
        this.calcDirection();
        
        this.x += this.dirX * 1 / dl.Main.FRAM_RATE * SPEED;
        this.y += this.dirY * 1 / dl.Main.FRAM_RATE * SPEED;
    };
    
}).call(this);