(function () {
    var Main = function() {
        this.coccu = new Array();
        this.link = new dl.characters.Link(dl.values.WIDTH / 2, dl.values.HEIGHT / 2);
        this.background = null;
        this.hud = null;
        this.init();
        this.popTimer = 0;
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
    
    _main.loopAction = function () {
        //Pop new coccu
        this.popTimer++;
        if (this.popTimer >= 30)
            {
                if (this.coccu.length < 1)
                    this.coccu.push(new dl.characters.Cucco());
            this.popTimer = 0;
            }

        //clean screen
        dl.ctx.clearRect(0, 0, dl.values.WIDTH, dl.values.HEIGHT);
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
        this.link.move();
        this.link.animation();
    };
    
    window.onload = function () {
        new Main().run();
    };
}).call(this);