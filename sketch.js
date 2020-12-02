var tower,towerImg;
var ghost,ghostImg;
var climber,climberImg;
var door,doorImg;
var doorsGroup,climberGroup ;
var gameState = "play";
var play;
var end;
var score;
var invisibleBlock,invisibleBlockGroup;
var spookySound


function preload() {
  
  towerImg = loadImage("tower.png");
  ghostImg = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png")
  
 doorsGroup = new Group();
 climberGroup = new Group(); 
  
  spookySound = loadSound("spooky.wav");
  
}

function setup() {
  createCanvas(600,600)
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 4;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.5;
  
  score = 0;
  
  invisibleBlockGroup = new Group();
  
  
  
}

function draw() {
  background(0);
  
  stroke("red")
  fill("red")
  text("score: " + score,500,50)

  
  // adding gamestates
  
  if(gameState === "play") {

    spookySound.play();
    
    score = score + Math.round(getFrameRate()/60) 
    
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -3;
  }
  if(keyDown("right_arrow")) {
    ghost.x = ghost.x +3;
  }
  if(keyDown("space")) {
    ghost.velocityY = -3;
  }
    
  if(tower.y > 600) {
    tower.y = 300;
  }       
  ghost.velocityY = ghost.velocityY + 0.8
    
  spawnDoors();
    
 
    if(ghost.isTouching(climberGroup)) {
  ghost.velocityY = 0;
  } 
    
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy();
    gameState = "end"
  }

     drawSprites();  
    
} else if(gameState === "end") {

  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("GAME OVER",230,250);
  

}
  

  
 
}

function spawnDoors() {

  if(frameCount % 250 === 0) {
    
    door = createSprite(200,-50)
    door.addImage(doorImg);
    door.x = Math.round(random(100,400)) 
    door.velocityY = 6;
    door.lifetime = 600;
    doorsGroup.add(door);

    climber = createSprite(200,20)
    climber.addImage(climberImg)
    climber.x = door.x;
    climber.velocityY = 6;
    climber.lifetime = 600;
    climberGroup.add(climber);
    
    invisibleBlock = createSprite(200,15)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 6;
    invisibleBlock.lifetime = 600
    
  ghost.depth = door.depth
  ghost.depth = ghost.depth +1
  invisibleBlock.debug = true;
  invisibleBlockGroup.add(invisibleBlock)
    
    
  }
  
  

}

