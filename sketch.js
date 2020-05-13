var trex,tRex1,tRex3,trex_running,tRex4,ground,invisibleground,ground2;
var gameState,gameScore,highScore;
var cloud,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,restart,whichEnemy,enemyGroup,cloudGroup,cloudImg;

var restartImg,gameOverImg,restart,gameOver;
var jumpSound,dieSound,checkPoint;

function preload(){
  tRex1 = loadImage("trex1.png");
  tRex3 = loadImage("trex3.png");
  tRex4 = loadImage("trex4.png");
  ground = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  tRexCollide = loadImage("trex_collided.png");
  cloudImg = loadImage("cloud.png");
  
  trex_running = loadAnimation(tRex1,tRex4,tRex3);
  
  cloudGroup = new Group();
  enemyGroup = new Group();
  
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(600, 400);
  
  trex = createSprite(50,350,50,50);
  trex.scale = 0.5;
  trex.addAnimation("running",trex_running);
  
  ground2 = createSprite(200,380,50,50);
  ground2.addImage(ground);
  ground2.position.x = ground2.width/2;
  ground2.setVelocity(-5,0);
  
  invisibleground = createSprite(200,388,600,10);
  invisibleground.visible = false;
  
  gameOver = createSprite(300,250,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,285,50,50);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameState = "play";
  gameScore = 0;
  highScore = 0;
}

function draw() {
  background(255);
  
  gameOver.visible = false;
  restart.visible = false;
  
  whichEnemy = random(1,6);
  
  trex.velocity.y = trex.velocity.y + 0.8;
  trex.collide(invisibleground);  
  
  if(ground2.position.x < 0)
   ground2.position.x = ground2.width/2;
  
  highScorefunc(gameScore);
  
  if(gameState === "play"){
    spawnObstacles();
    spawnClouds();
    gameScore = gameScore + Math.round(getFrameRate()/60);
    
    if(gameScore % 100 === 0){
     checkPoint.play(); 
     ground2.velocity.x += -2;
    }
  }
  
  if(gameState === "over"){
    ground2.velocity.x = 0; 
    gameOver.visible = true;
    restart.visible = true;
    
    if(mousePressedOver(restart)){
     gameState = "play";
     gameScore = 0;
     cloudGroup.destroyEach();
     enemyGroup.destroyEach();
    }
  }
  drawSprites();
  
  text("Score:"+gameScore+"  HighScore:"+highScore,300,100);
}
function keyPressed(){
 if(keyCode === UP_ARROW && trex.position.y > 350 && gameState === "play"){
   trex.velocity.y = -10;
   jumpSound.play();
 }
}
function spawnObstacles(){
 if(frameCount % 60 == 0){
  var enemy = createSprite(600,360,50,50);
   whichEnemy = Math.round(random(1,6));
  switch(whichEnemy){
    case 1:enemy.addImage(obstacle1);
      break;
    case 2:enemy.addImage(obstacle2);  
      break;
    case 3:enemy.addImage(obstacle3);
      break;
    case 4:enemy.addImage(obstacle4);
      break;
    case 5:enemy.addImage(obstacle5);
      break;
    case 6:enemy.addImage(obstacle6);
      break;
     default : break;
  }  
   enemy.setVelocity(ground2.velocity.x,0);
   enemy.scale = 0.5;
   enemy.setCollider("rectangle",0,0,50,80);
   enemy.collide(invisibleground);
   enemyGroup.add(enemy);
 }
 if(enemyGroup.isTouching(trex)){
   gameState = "over";
   trex.addImage(tRexCollide);
   dieSound.play();
  }
}
function spawnClouds(){
 if(frameCount % 60 === 0){
  var cloud = createSprite(600,315,50,50);
  cloud.position.y = random(290,315);
  cloud.scale = 0.8;
  cloud.addImage(cloudImg);
  cloud.velocity.x = ground2.velocity.x;
  cloud.lifetime = 200;
  trex.depth = cloud.depth + 1;
  cloudGroup.add(cloud);
 }
}
function highScorefunc(score){
  if(score > highScore)
    highScore = score;
  else
    highScore = highScore;
}