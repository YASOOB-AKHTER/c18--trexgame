var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
var box1,box2,box3,box4,box5,box6;
var cloudsGroup,boxGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver ,gameOverimg;
var restart ,restartimg;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudimg = loadImage("cloud.png");
  box1=loadImage("obstacle1.png");
   box2=loadImage("obstacle2.png");
   box3=loadImage("obstacle3.png");
   box4=loadImage("obstacle4.png");
   box5=loadImage("obstacle5.png");
   box6=loadImage("obstacle6.png");
  gameOverimg=loadImage("gameover.png");
  restartimg=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cloudsGroup=new Group();
  boxGroup=new Group();
 gameOver = createSprite(300,100);
  gameOver.addImage("gameOver",gameOverimg);
restart = createSprite(300,150);
  restart.addImage("restart",restartimg);
  gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(255);
   
   trex.collide(invisibleGround);
  if(gameState===PLAY){
    if (ground.x < 0){ 
    ground.x = ground.width/2;
  }
    if(keyDown("space") && trex.y >= 359){
      trex.velocityY = -12 ;
    }
      trex.velocityY = trex.velocityY + 0.8;
     if(boxGroup.isTouching(trex)){
      
      gameState = END;
     }
    
     spwanclouds();
    spwanbox();
  }
  else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    boxGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    trex.setAnimation("trex_collided");
    
  
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  
  
  if(mousePressedOver(restart)) {
    reset();
  }
  }

  drawSprites();
}
function spwanclouds(){
  if(frameCount%60 ===0){
    cloud=createSprite(600,120,30,30);
    cloud.y=Math.round(random(80,120));
    cloud.velocityX=-5;
    cloud.addImage("cloud",cloudimg);
    cloud.lifetime=120;
    cloud.depth=trex.depth;
    cloud.depth=trex.depth+1;
    cloudsGroup.add(cloud);
  }}
   function spwanbox(){
     if(frameCount%80===0){
       cactus=createSprite(600,165 ,30,30);
       cactus.velocityX=-6;
     var rand=Math.round(random(1,6));
       switch(rand){
         case 1:cactus.addImage("box",box1);
           break;
                    case 2:cactus.addImage("box",box2);
           break;
          case 3:cactus.addImage("box",box3);
           break;          
           case 4:cactus.addImage("box",box4);
           break;
                    case 5:cactus.addImage("box",box5);
           break;
                    case 6:cactus.addImage("box",box6);
           break;
           default:break;
       }
       cactus.scale=0.6;
       cactus.lifetime=100;
       boxGroup.add(cactus);
     }}
    function reset(){
  gameState=PLAY;
  boxGroup.destroyEach();
  CloudsGroup.destroyEach();
  trex.setAnimation("trex");
  gameOver.visible=false;
  restart.visible=false;
  
}
  
  
  
  