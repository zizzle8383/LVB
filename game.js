var myGamePiece;
var secondcanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
     clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
    
};
function startGame() {
    myGameArea.start();
    secondcanvas.start();
    create();
}

function createbackgrounds(){
    BG01 = new component(myGameArea.canvas.width, myGameArea.canvas.height,"areas/area1/background.png",0,0,"image");
}

function createforegrounds(){
  FG01 = new component(myGameArea.canvas.width, myGameArea.canvas.height,"areas/area1/foreground.png",0,0,"image");    
}

function createdetection(){
  HD01 = new Scomp(secondcanvas.canvas.width, secondcanvas.canvas.height,"areas/area1/Hitdet (1).png",0,0,"image");
}

function create(){
  createbackgrounds();
  myGamePiece = new component(100, 100, "Llama_Down.png", myGameArea.canvas.width/2, myGameArea.canvas.height/2, "image");
  createforegrounds();
  createdetection();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
          myGameArea.keys = (myGameArea.keys || []);
          myGameArea.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function (e) {
          myGameArea.keys[e.keyCode] = false;
        });
    },
     clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
    
};

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
  };

}

function Scomp(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx2 = secondcanvas.context;
    if (type == "image") {
      ctx2.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    } else {
      ctx2.fillStyle = color;
      ctx2.fillRect(this.x, this.y, this.width, this.height);
    }
    
  };

}


function moveBackgrounds(xy,move){
    if (xy == "x"){
      BG01.x += move;   
    }else if(xy=="y"){
      BG01.y += move;
    }
}

function moveForegrounds(xy,move){
    if (xy == "x"){
      FG01.x += move;   
    }else if(xy=="y"){
      FG01.y += move;
    }
}


function moveHitDetect(xy,move){
    if (xy == "x"){
      HD01.x += move;   
    }else if(xy=="y"){
      HD01.y += move;
    }
}    

function updateBackgrounds(){
 BG01.update();
}
function updateForegrounds(){
 FG01.update();   
}
function updateHitDetect(){
 HD01.update();
}

function updateGameArea() {
  myGameArea.clear();
  secondcanvas.clear();
  oldx = BG01.x;
  oldy = BG01.y;
  if (myGameArea.keys && myGameArea.keys[37] || myGameArea.keys && myGameArea.keys[65]) {moveBackgrounds("x",-2.5); moveForegrounds("x",-2.5); moveHitDetect("x",-2.5);  myGamePiece.image.src ="Llama-Left.png"}
  if (myGameArea.keys && myGameArea.keys[39] || myGameArea.keys && myGameArea.keys[68]) {moveBackgrounds("x",2.5); moveForegrounds("x",2.5); moveHitDetect("x",2.5); myGamePiece.image.src ="Llama-Right.png"}
  if (myGameArea.keys && myGameArea.keys[38] || myGameArea.keys && myGameArea.keys[87]) {moveBackgrounds("y",2.5); moveForegrounds("y",2.5); moveHitDetect("y",2.5); myGamePiece.image.src ="Llama_Up.png"}
  if (myGameArea.keys && myGameArea.keys[40] || myGameArea.keys && myGameArea.keys[83]) {moveBackgrounds("y",-2.5); moveForegrounds("y",-2.5); moveHitDetect("y",-2.5); myGamePiece.image.src ="Llama_Down.png"}
  updateBackgrounds();
  myGamePiece.update();
  updateForegrounds();
  updateHitDetect();
  let imagedata = ctx2.getImageData(myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height).data;
    for(var i=0;i<imagedata.length;i+=4){
            if(
                imagedata[i+0]==195&&
                imagedata[i+1]==255&&
                imagedata[i+2]==0
            ){
                BG01.y = oldy; FG01.y = oldy; HD01.y = oldy; BG01.x = oldx; FG01.x = oldx; HD01.x = oldx;
                return true;
            }
        }
        return false;
    }
  


window.onload = startGame;







