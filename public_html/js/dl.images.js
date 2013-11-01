/**
 * @namespace dl.images
 */

(function () {
  /**
   * @namespace images
   */
  dl.images = {};
    
    /**
   * @constant
   */
  dl.images.mainAtlasPath = "ress/img/link.png"
  dl.images.mainAtlas = new Image();
  dl.images.mainAtlas.src = dl.images.mainAtlasPath;

  dl.images.backGroundPath = "ress/img/bg.png"
  dl.images.backGroundImg = new Image();
  dl.images.backGroundImg.src = dl.images.backGroundPath;

  
  dl.images.frames = [];
  dl.images.framesPath = "ress/json/link.json";

  dl.images.DrawImage = function (image, sprite_name, x, y, sizeX, sizeY, revertH, revertV) {
      var sx, sy, swidth, sheight = 0;
      dl.ctx.save();
      
      //extract the images from Json
      var myJson = dl.images.frames;
      for (var i=0; i < myJson.length; i++) {
          if (myJson[i]["filename"] === (sprite_name + ".png")) {
              sx = myJson[i]["frame"]["x"];
              sy = myJson[i]["frame"]["y"];
              swidth = myJson[i]["frame"]["w"];
              sheight = myJson[i]["frame"]["h"];
              x += myJson[i]["spriteSourceSize"]["x"];
              y += myJson[i]["spriteSourceSize"]["y"];
              break;
          }
      }
      //Mirror H/V
       dl.ctx.scale(revertH ? -1 : 1, revertV ? -1 : 1);
      
      //Draw
      if (sizeX === -1)
          sizeX = swidth;
      if (sizeY === -1)
          sizeY = sheight;
      
      dl.ctx.drawImage(dl.images.mainAtlas, sx, sy, swidth, sheight, x, y, sizeX, sizeY);
      dl.ctx.scale(1, 1);
      dl.ctx.restore();
  };
}).call(this);

