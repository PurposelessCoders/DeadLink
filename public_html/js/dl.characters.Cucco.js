(function () {
    
    var SIZE = 10;
    var SPEED = 10;

    var Cucco = function () {
      //dl.Character(this, x, y, SIZE);
      this.dirX = 0;
      this.dirY = 0;     
      this.x = 0;
      this.y = 0;
      
      this.initPosition();
      this.calcDirection();
      //TODO LATER
      this.loadSprite();
    };
    
    dl.characters.Cucco = Cucco;
    var _cucco = Cucco.prototype;
    
    _cucco.initPosition = function () {
      var randResult = Math.random();  
        console.log (randResult);
        if (randResult <= 0.25) { //TOP
            this.x = 0;
            this.y = Math.random() * dl.values.WIDTH;
        } else if (randResult <= 0.5) { //BOTTOM
            this.x = Math.random() * dl.values.HEIGHT;       
            this.y = dl.values.HEIGHT;
        } else if (randResult <= 0.75) { //LEFT
            this.x = 0;
            this.y = Math.random() * dl.values.WIDTH;;
        } else { //RIGHT
            this.x = Math.random() * dl.values.HEIGHT;
            this.y = dl.values.WIDTH;
        }
    };
    
    _cucco.animation = function() {
        dl.ctx.fillRect(this.x, this.y, 20, 20);
    };
    
    _cucco.calcDirection = function () {
        
        var vector =  {
                x: dl.mainCharacter.x - this.x,
                y: dl.mainCharacter.y - this.y
        };
        vector = Math.normalize(vector);
        this.dirX = vector.x;
        this.dirY = vector.y;
    };
    
    _cucco.move = function() {
        this.x += this.dirX * 1 / dl.values.FRAME_RATE * SPEED;
        this.y += this.dirY * 1 / dl.values.FRAME_RATE * SPEED;
        
        if (this.x < 0 || this.y < 0 || this.x > dl.values.WIDTH || this.y > dl.values.HEIGTH) {
            this.calcDirection();
        }
    };
    
    _cucco.loadSprite = function () {
        
    };
    
}).call(this);