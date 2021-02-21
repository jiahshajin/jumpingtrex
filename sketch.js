var PLAY = 1;
var END = 0;
var gameState = PLAY;
//var backGround;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var sun; 
var cloudsGroup, cloudImage;
var obstaclesGroup,  obstacle3, obstacle4, obstacle5, obstacle6;
 var bird,birdGroup;
 
var score;
var gameoverImg,restartImg
var jumpSound , checkPointSound, dieSound

localServer = ["HighestScore"];
localServer[0] = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  birdImage=loadImage("bird.png");
  groundImage = loadImage("ground2.png");
   sunImage=loadImage("sun.png");
  cloudImage = loadImage("cloud1.png");
 //// backGroundImage=loadImage("backGround.png");
 // obstacle1 = loadImage("obstacle1.png");
 // obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameoverImg = loadImage("gameover.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(900,400);
   
   message = "This is a message";
 console.log(message)
  
  trex = createSprite(80,160 ,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
    trex.setCollider('circle',0,0,110) 
  trex.scale=0.5
  
  //backGround=createSprite(0,0,2000,600)
 
  ground = createSprite(width/2,height+80,width,80);
  ground.addImage("ground",groundImage);
  ground.x = width/2;
   ground.velocityX = -(6+ 3*score/100);
  
  gameover = createSprite(500,100);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(500,140);
  restart.addImage(restartImg);
  
  
  gameover.scale = 0.5;
  restart.scale = 0.5;
  
  sun=createSprite(width-90,130,20,20)
  sun.addImage(sunImage);
  sun.scale=0.2;
  
  invisibleGround = createSprite(width/2,height-6,width,10);
  invisibleGround.visible = false;
 
  
  //create Obstacle,Cloud Groupsand birdGroup
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  //birdGroup= createGroup();
  
   //trex.setCollider("rectangle",0,0,trex.width,trex.height);
 // trex.debug =true
  
  
  score = 0;
  
}

function draw() {
  background("lightblue");
 // background(backGroundImage);
  //displaying score
  fill("purple")
  textSize(23);
  textFont("caligraphy");
  text("Score: "+ score, width/6,width/50);
  text("HI= "+ localServer[0],width/60,height/20)
  
   
     
     

    //if (backGround.x < 0) {
      //backGround.x = backGround.width / 2;
   // }
  
  if(gameState === PLAY){
     //Making trex jump when pressing space or touching the screen.
      if(  keyDown("space")   && trex.y >= 170|| touches.length > 0 && trex.y>=170 ){
        trex.velocityY = -12;
        jumpSound.play();
        touches = [];
    } 

    gameover.visible = false; 
    restart.visible = false;
    
    ground.velocityX = -(6+ 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
     
    
   // if(keyDown("space")){
     // trex.velocityY = -10;
   // }
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
   trex.collide(invisibleGround);
   spawnClouds();
   spawnObstacles();
   // spawnBird();
    
    if(obstaclesGroup.isTouching(trex)){
       // trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
    //if(birdGroup.isTouching(trex)){
     // jumpSound.play();
      //gameState=END;
     // dieSound.play()
    //}
        
}

   else if (gameState === END) {
      gameover.visible = true;
      restart.visible = true;
     
     //change the trex animation
      trex.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
   //  birdGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
    // birdGroup.setVelocityXEach(0);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  if(mousePressedOver(restart)||touches.length > 0) {
      reset();
    touches = [];
    }


ground.depth = trex.depth;
  trex.depth = trex.depth + 1;
  
  drawSprites();
}

 

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(890  ,height-50,10,40);    
   obstacle.velocityX = -(6 + score/100);
   obstacle.setCollider('circle',0,0,12)
   //     obstacle.scale=0.8
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
     // case 1: obstacle.addImage(obstacle1);
       // obstacle.scale=0.4;
            //  break;
      //case 2: obstacle.addImage(obstacle2);
       // obstacle.scale=0.8;
            //  break;
      case 1: obstacle.addImage(obstacle3);   
       // obstacle.scale=0.8;
              break;
      case 2: obstacle.addImage(obstacle4);
       // obstacle.scale=0.9;
              break;
      case 3: obstacle.addImage(obstacle5);
       // obstacle.scale=0.9;
              break;
      case 4: obstacle.addImage(obstacle6);
         //obstacle.scale=0.9;
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width+20,height-40,40,10);
    cloud.y = Math.round(random(height-200,height-400));
    cloud.addImage(cloudImage);
    cloud.scale = 0.3;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    
    
    cloud.depth = gameover.depth;
    gameover.depth = gameover.depth + 1;
    
    cloud.depth = sun.depth;
    sun.depth = sun.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}
function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
   trex.changeAnimation("running",trex_running);
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  //birdGroup.destroyEach();
 
  if(localServer[0]<score){
    localServer[0]=score;
  }
    score=0;
}
//function spawnBird(){
  //if(frameCount%60===0){
   // var bird = createSprite(900,10,20,20);
    // bird.setCollider('circle',0,0,52) 
    //bird.velocityX = -9;
   // bird.addImage(birdImage);
  
   // bird.lifetime=390;
    //bird.y=Math.round(random(20,200));
   // birdGroup.add(bird);
  //}
    
//}
