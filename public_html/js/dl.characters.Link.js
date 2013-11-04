(function () {
    
    var SIZE = 30;
    var SPEED = 200;
    var INVULNERABILITY = 1000; //in ms;
    var NBLIFE = 3;

    var IMG_UP = "Link_Back";
    var IMG_DOWN = "Link_Front";
    var IMG_RIGHT = "Link_Rigth";
    var IMG_LEFT = "Link_Left";
    
    var Link = function (x, y) {
      this.x = x;
      this.y = y;
      this.dirX = 0;
      this.dirY = 0;
      this.speed = SPEED;
      this.size = SIZE;
      this.life = NBLIFE;
      this.cooldown = 0;
      this.spriteTmp = 0;
      this.spriteCurrent = 0;
      this.spriteNb = 6;
      this.prevSprite = 0;
      this.spriteTmpChange = 20;
      
      this.hitSpriteCurrent = 3;
      this.hitSpriteNb = 3;
    };
    
    dl.characters.Link = Link;
    var _link = Link.prototype;
    
    _link.animation = function() {
        var current_sprite;
        var mirror = false;
        if (Math.abs(this.dirX) < Math.abs(this.dirY)) {
            if (this.dirY >= 0)
                current_sprite = IMG_DOWN;
            else
                current_sprite = IMG_UP;
        } else {
               current_sprite = IMG_LEFT;
            if (this.dirX >= 0) {
                current_sprite = IMG_RIGHT;
            }
        }
        if (current_sprite !== this.prevSprite)
            this.spriteCurrent = 0;
        dl.images.DrawImage(dl.images.mainAtlas, (current_sprite + "_" + this.spriteCurrent), this.x - (SIZE / 2), this.y - (SIZE / 2), SIZE, SIZE, mirror);
        if (this.hitSpriteCurrent !== this.hitSpriteNb) {
            dl.images.DrawImage(dl.images.mainAtlas, ("pen_" + this.hitSpriteCurrent), this.x - (SIZE / 2), this.y - (SIZE / 2), SIZE, SIZE);
        }
        this.prevSprite = current_sprite;
        this.spriteTmp++;
        if (this.spriteTmp === this.spriteTmpChange) {
            this.spriteCurrent = (this.spriteCurrent + 1) % this.spriteNb;
            this.spriteTmp = 0;
            if (this.cooldown > 0 && this.hitSpriteCurrent !== this.hitSpriteNb)
                this.hitSpriteCurrent++;
        }
        
        //DISPLAY LIFES
        for (i = 0; i < NBLIFE; i++){
           if (i < this.life)
               dl.images.DrawImage(dl.images.mainAtlas, "life_0", 40 + i * 15, 15, 14, 14);
           else
               dl.images.DrawImage(dl.images.mainAtlas, "life_1", 40 + i * 15, 15, 14, 14);
        }
    };
    
    _link.calcDirection = function () {
        
        var vector =  {
                x: dl.mousePos.x - this.x,
                y: dl.mousePos.y - this.y
        };
        if (Math.abs(vector.x) < 1)
            vector.x = 0;
        if (Math.abs(vector.y) < 1)
            vector.y = 0;
        vector = Math.normalize(vector);
        this.dirX = vector.x;
        this.dirY = vector.y;
    };
    
    _link.move = function() {
        if (this.cooldown > 0)
            this.cooldown -= 1000 * dl.time.DeltaTime();
        this.calcDirection();
        
        //Movement limit
        var can_move = false;
        
        x = this.x + this.dirX * dl.time.DeltaTime() * SPEED;
        y = this.y + this.dirY * dl.time.DeltaTime() * SPEED;

        if (this.y > 105 && this.y <= 265 && this.x >= 117 && this.x <= 375) {
            if (!(x > 117  && x < 375))
                x = this.x;
            if (!(y > 105))
                y = this.y;
            can_move = true;
        }
        if (this.y > 265 && this.y <= 290 && this.x > 67 && this.x <= 400) {
            if (!(x > 67  && x < 400))
                x = this.x;
            if (y < 265 && (x < 117 || x > 375))
                y = this.y;
            if (y > 290 && (x < 100 || x > 400))
                y = this.y;
            can_move = true;
        }
        if (this.y > 290 && this.y < 330 && this.x > 100 && this.x <= 400) {
            if (!(x > 100  && x < 400))
                x = this.x;
            if (!(y < 330))
                y = this.y;
            can_move = true;
        }

        if (can_move) {
            this.x = x;
            this.y = y;
        }
    };
    
    _link.hit = function () {
        if (this.cooldown <= 0)
            {
                this.life--;
                this.cooldown = INVULNERABILITY;
                this.hitSpriteCurrent = 0;
            }
    };
    
    _link.isColliding = function (cucco) {
        if (Math.abs(cucco.x - this.x) < (cucco.size / 4) + (this.size / 2)
            && Math.abs(cucco.y - this.y) < (cucco.size / 4) + (this.size / 2))
            this.hit();
    };
}).call(this);