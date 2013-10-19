(function () {
    var HEIGHT = 500;
    var WIDTH = 500
    
    var Main = function() {
        this.coccu = [];
        this.link = new dl.characters.Link(HEIGHT / 2, WIDTH / 2);
        this.background = null;
        this.hud = null;
        this.init();
    };
    
    dl.Main = Main;
    var _main = Main.prototype;
    
    _main.init = function () {
        var that = this;
        dl.mousePos = {x: 0, y: 0};
        var canvas = document.getElementById("gameCanvas");
        dl.ctx = canvas.getContext("2d");
        canvas.addEventListener('mousemove', function(evt) {
            dl.mousePos = that.getMousePos(canvas, evt);
        }, false);
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
        //TODO pop cucco
        //Move
        for (var i = 0; i < this.coccu.lenght; i++) {
            this.coccu[i].move();
        }
        this.link.move();
        //Display
        //clean screen
        
        //cucco
        for (var i = 0; i < this.coccu.lenght; i++) {
            this.coccu[i].animation();
        }
        //link
        this.link.animation();        
    };
    
    window.onload = function () {
        new Main().run();
    };
}).call(this);