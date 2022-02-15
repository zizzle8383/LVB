var myGamePiece;

function startGame() {
    myGameArea.start();
    create();
}


function create(){
  myBackground = new component(myGameArea.canvas.width, myGameArea.canvas.height,"background.png",0,0,"image");
  myGamePiece = new component(50, 50, "Llama_Down.png", myGameArea.canvas.width/2, myGameArea.canvas.height/2, "image");
  myForeground = new component(myGameArea.canvas.width, myGameArea.canvas.height,"foreground.png",0,0,"image");
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
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
  this.speedX = 0;
  this.speedY = 0;
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

function updateGameArea() {
  myGameArea.clear();
  oldx = myBackground.x;
  oldy = myBackground.y;
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.keys && myGameArea.keys[37] || myGameArea.keys && myGameArea.keys[65]) {myBackground.x += 2.5; myForeground.x += 2.5;myGamePiece.image.src ="Llama-Left.png"}
  if (myGameArea.keys && myGameArea.keys[39] || myGameArea.keys && myGameArea.keys[68]) {myBackground.x -= 2.5; myForeground.x -= 2.5; myGamePiece.image.src ="Llama-Right.png"}
  if (myGameArea.keys && myGameArea.keys[38] || myGameArea.keys && myGameArea.keys[87]) {myBackground.y += 2.5; myForeground.y += 2.5; myGamePiece.image.src ="Llama_Up.png"}
  if (myGameArea.keys && myGameArea.keys[40] || myGameArea.keys && myGameArea.keys[83]) {myBackground.y -= 2.5; myForeground.y -= 2.5; myGamePiece.image.src ="Llama_Down.png"}
  myBackground.update();
  myGamePiece.update();
  myForeground.update();
  let imageData = ctx.getImageData(60, 60, 200, 100);
  
}
window.onload = startGame;







