(function () {
    
    var Main = function() {
        this.coccu = new Array();
        this.link = new dl.characters.Link(dl.values.WIDTH / 2, dl.values.HEIGHT / 2);
        this.background = null;
        this.hud = null;
        this.score = 0;
        this.popTimer = 0;
        this.diplayScore = false;
        this.init();
    };
    
    dl.Main = Main;
    var _main = Main.prototype;
    
    _main.init = function () {
        var that = this;
        dl.mousePos = {x: 0, y: 0};
        var canvas = document.getElementById("gameCanvas");
        canvas.heigth = dl.values.HEIGHT;
        canvas.width = dl.values.WIDTH;
        dl.ctx = canvas.getContext("2d");
        canvas.addEventListener('mousemove', function(evt) {
            dl.mousePos = that.getMousePos(canvas, evt);
        }, false);
        dl.mainCharacter = this.link;
        dl.myMain = this;
        
        var atlasReq = new  XMLHttpRequest();
        atlasReq.open("GET", dl.images.framesPath, true);
        atlasReq.onload = function () {
                dl.images.frames = JSON.parse(this.responseText)["frames"];
            };
        atlasReq.send();
    };
    
    _main.getMousePos = function (canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
    };
    
    _main.run = function () {
        this.startLoop();
    };
  
    _main.startLoop = function () {
        var that = this;
        var timeFrameMiliSec = 1000 / dl.FRAME_RATE;
        

        setInterval(function () {
         that.loopAction();
        }, timeFrameMiliSec);
        
    };
    
    _main.DisplayFinal = function () {
        this.diplayScore = true;
        document.getElementById("result").innerHTML = "You found a <s>living</s> dead Link";
        document.getElementById("score").innerHTML = "Final Socre: " + Math.floor(this.score);
    }
    
    _main.loopAction = function () {
        stats.begin();
        dl.time.Update();
        if (this.link.life <= 0)
            {
                if (this.diplayScore === false)
                    this.DisplayFinal();
            }
            
        this.score += this.coccu.length * dl.time.DeltaTime();
        //Pop new coccu
        this.popTimer++;
        if (this.popTimer >= 240)
            {
                if (this.coccu.length < 500)
                    this.coccu.push(new dl.characters.Cucco());
            this.popTimer = 0;
            }

        //Draw background
        dl.ctx.drawImage(dl.images.backGroundImg,0,0,dl.images.backGroundImg.width, dl.images.backGroundImg.height,0,0, dl.values.WIDTH, dl.values.HEIGHT);
        //cucco
        for (i = 0; i < this.coccu.length; i++) {
        //Move
            this.coccu[i].move();
        //Display
            this.coccu[i].animation();
        //Check COllider
            this.link.isColliding(this.coccu[i]);
        }
        //link
        if (this.link.life > 0) {
            this.link.move();
            this.link.animation();
        }
        stats.end();
    };
    
    window.onload = function () {
        new Main().run();
    };
}).call(this);