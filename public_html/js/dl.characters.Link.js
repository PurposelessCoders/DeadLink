(function () {
    
    var SIZE = 10;
    var SPEED = 20;
    var INVULNERABILITY = 5000; //in ms;
    var NBLIFE = 3;
    
    var Link = function (x, y) {
      //dl.Character(this, x, y, SIZE);
      this.x = x;
      this.y = y;
      this.dirX = 0;
      this.dirY = 0;
      this.speed = SPEED;
      this.size = SIZE;
      this.life = NBLIFE;
      this.cooldown = 0;
      
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
        if (this.cooldown > 0)
            this.cooldown -= 1000 / dl.values.FRAME_RATE
        this.calcDirection();
        
        this.x += this.dirX * 1 / dl.values.FRAME_RATE * SPEED;
        this.y += this.dirY * 1 / dl.values.FRAME_RATE * SPEED;
    };
    
    _link.hit = function () {
        if (this.cooldown <= 0)
            {
                this.life--;
                this.cooldown = INVULNERABILITY;
            }
    };
    
    _link.isColliding = function (cucco) {
        if (Math.abs(cucco.x - this.x) < cucco.size + this.size
            &&Math.abs(cucco.y - this.y) < cucco.size + this.size)
            this.hit();
    };
}).call(this);