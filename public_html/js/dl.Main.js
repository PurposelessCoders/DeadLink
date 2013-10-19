(function () {
    
    var FRAME_RATE = 60;
    
    var Main = function() {
        this.coccu = [];
        this.link = null;
        this.background = null;
        this.hud = null;
        this.init();
    };
    
    dl.Main = Main;
    var _main = Main.prototype;
    
    _main.init = function () { 
        var canvas = document.getElementById("gameCanvas");
        dl.ctx = canvas.getContext("2d");
    };
    
    _main.run = function () {
        this.startLoop();
    };
  
    _main.startLoop = function () {
        var that = this;
        var timeFrameMiliSec = 1000 / FRAME_RATE;

        setInterval(function () {
         that.loopAction();
        }, timeFrameMiliSec);
    };
    
    _main.loopAction = function () {
        //TODO add cucco
    };
    
    window.onload = function () {
        new Main().run();
    };
}).call(this);