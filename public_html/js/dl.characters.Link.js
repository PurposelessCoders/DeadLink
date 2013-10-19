(function () {
    
    var SIZE = 10;
    var SPEED = 10;
        
    var Link = function (x, y) {
      //dl.Character(this, x, y, SIZE);
      this.x = 0;
      this.y = 0;
      this.dirX = 0;
      this.dirY = 0;
      this.speed = SPEED;
      
      //TODO LATER
      this.loadSprite();
    };
    
    dl.characters.Link = Link;
    var _link = Link.prototype;
    
    _link.loadSprite = function() {
        //TODO LATER
    };
    
    _link.animation = function() {
        //DEBUG FOR NOW, SPRITE COME LATER
        dl.ctx.fillRect(this.x, this.y, 20, 20);
    };
    
    _link.calcDirection = function () {
        
        var vector =  {
                x: dl.mousePos.x - this.x,
                y: dl.mousePos.y - this.y
        };
        vector = Math.normalize(vector);
        this.dirX = vector.x;
        this.dirY = vector.y;
    };
    
    _link.move = function() {
        this.calcDirection();
        
        this.x += this.dirX * 1 / 60 * SPEED;
        this.y += this.dirY * 1 / 60 * SPEED;
    };
}).call(this);