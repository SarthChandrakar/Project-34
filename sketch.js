var balloon
var dataBase

function preload() {
  bg= loadImage("background.png")
  ballImage= loadImage("hotairballoon.png")
  Image1= loadImage("Image1.png")
  Image2=loadImage("Image2.png")
}

function setup() {
  dataBase = firebase.database()
  createCanvas(500,500);
  ball = createSprite(400, 200, 50, 50);
  ball.addImage(ballImage)
  var balloonPosition = dataBase.ref('balloon/height');
    balloonPosition.on("value",readHeight,showerror);
}

function draw() {
  background(bg);  
  if(keyDown("LEFT_ARROW")){
   updateHeight(-5,0)
    ball.addImage(Image1)
  }
  else if(keyDown("RIGHT_ARROW")){
    updateHeight(+5,0)
    ball.addImage(Image1)
  }
  else if(keyDown("UP_ARROW")){
    updateHeight(0,-5)
    ball.addImage(Image2)
  }
  else if(keyDown("DOWN_ARROW")){
    updateHeight(0,+5)
    ball.addImage(Image2)
  }
  drawSprites();
}


function updateHeight(x,y){
  dataBase.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height=data.val();
  ball.x = height.x;
  ball.y  =height.y;
}

function showerror(){
  console.log("Erron in writing to the data base")
}