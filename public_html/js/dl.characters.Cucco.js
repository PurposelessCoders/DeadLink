(function () {
    
    var SIZE = 20;
    var SPEED = 200;
    var SPEED_ACCELERATION = 1.05;
    var SPEED_MAX = 40;
    var ERROR_POURCENT = 0.62;

    var IMG_RIGHT = "Cucco_Right_";
    var IMG_LEFT = "Cucco_Left_";

    var Cucco = function () {
      //dl.Character(this, x, y, SIZE);
      this.dirX = 0;
      this.dirY = 0;     
      this.x = 0;
      this.y = 0;
      this.speed = SPEED;      
      this.size = SIZE;
      this.spriteCurrent = 0;
      this.spriteName = "";
      this.spriteNb = 3;
      this.spriteTmp = 0;
      this.spriteTmpChange = 15;
      
      this.initPosition();
      this.calcDirection();
    };
    
    dl.characters.Cucco = Cucco;
    var _cucco = Cucco.prototype;
    
    _cucco.initPosition = function () {
      var randResult = Math.random();  

        if (randResult <= 0.25) { //TOP
            this.y = 0;
            this.x = Math.random() * dl.values.WIDTH;
        } else if (randResult <= 0.5) { //BOTTOM
            this.x = Math.random() * dl.values.WIDTH;       
            this.y = dl.values.HEIGHT;
        } else if (randResult <= 0.75) { //LEFT
            this.x = 0;
            this.y = Math.random() * dl.values.WIDTH;
        } else { //RIGHT
            this.y = Math.random() * dl.values.WIDTH;
            this.x = dl.values.WIDTH;
        }
    };
    
    _cucco.animation = function() {
       if (this.dirX >= 0)
            dl.images.DrawImage(dl.images.mainAtlas, (IMG_LEFT + this.spriteCurrent.toString()), this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
        else
            dl.images.DrawImage(dl.images.mainAtlas, (IMG_RIGHT + this.spriteCurrent.toString()), this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);

        this.spriteTmp++;
        if (this.spriteTmp === this.spriteTmpChange) {
            this.spriteCurrent++;
                if ((this.spriteCurrent === this.spriteNb && Math.random() > 0.2) || this.spriteCurrent > this.spriteNb) {
                    this.spriteCurrent = 0;
                }
            this.spriteTmp = 0;
        }
    };
    
    _cucco.calcDirection = function () {
        if (this.x < 0)
            this.x = 0;
        if (this.y < 0)
            this.y = 0;
        if (this.y > dl.values.HEIGHT)
            this.y = dl.values.HEIGHT;
        if (this.y > dl.values.WIDTH)
            this.y = dl.values.WIDTH;
        
        var vector =  {
                x: dl.mainCharacter.x - this.x,
                y: dl.mainCharacter.y - this.y
        };
        vector = Math.normalize(vector);
        if (this.speed < SPEED_MAX)
        this.speed = this.speed * SPEED_ACCELERATION;
        this.dirX = vector.x * (1 - (Math.random() * ERROR_POURCENT * (Math.random() < 0.5 ? -1 : 1 )));
        this.dirY = vector.y * (1 - (Math.random() * ERROR_POURCENT * (Math.random() < 0.5 ? -1 : 1 )));
    };
    
    _cucco.move = function() {
        this.x += this.dirX * dl.time.DeltaTime() * this.speed;
        this.y += this.dirY * dl.time.DeltaTime() * this.speed;
        
        if (this.x <= 0 || this.y <= 0 || this.x >= dl.values.WIDTH - (this.size * 2) || this.y >= dl.values.HEIGHT - (this.size  * 2)) {
            this.calcDirection();
        }
    };
    
    _cucco.loadSprite = function () {
        
    };
    
}).call(this);