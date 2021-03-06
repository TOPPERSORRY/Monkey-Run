var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var survivalTime = 0;
var invisibleGround;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,200);
  FoodGroup = new Group();
  obstacleGroup = new Group();
 monkey = createSprite(150,150);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.1; 
  ground = createSprite(400,193,600,20);
 
  ground.velocityX =-4;
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  monkey.setCollider("circle",monkey.x,monkey.y+150,40);
  monkey.debug = false;
}
              

function draw() {
 background("blue");
   
   if(gameState === PLAY){
   survivalTime = survivalTime+ Math.round(getFrameRate()/60); 
   }
  if(gameState === END){
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
    ground.velocityX = 0;
  textSize(30);  text("GAME OVER",200,120)
  }
  monkey.collide(invisibleGround);
 textSize(20);text("Survival Time : " + survivalTime,280,50);
  if(keyDown("space")&& monkey.y >= 144) {
        monkey.velocityY = -12;   
  }
  ground.x = ground.width/2;
monkey.velocityY = monkey.velocityY + 0.8
 // console.log(monkey.y);
   if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }
drawSprites();  
   spawnBananas();
  spawnObstacles();
}
function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 50 === 0) {
    banana= createSprite(600,100,40,10);
    banana.y = Math.round(random(70,100));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX =  -(6 + survivalTime/100);
    
     
    
    //adjust the depth
    monkey.depth = banana.depth;
    //add each cloud to the group
  FoodGroup.add(banana);
  }
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + survivalTime/100);
 obstacle.addImage(obstacleImage);
   obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
}
 
}