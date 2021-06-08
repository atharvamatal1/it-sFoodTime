var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedTime
var lastFed
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();
//if ther is changes in Food collum readStock function will work
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("feed the dog")
  feed.position(700,95)
feed.mousePressed(deductFood);
}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  feedTime=database.ref('FeedTime')
  feedTime.on("value",function(data){
    lastFed=data.val();
  })
  //write code to read fedtime value from the database 
  fill(255)
 text(lastFed,100,20)
  //write code to display text lastFed time here
console.log(foodObj.getFoodStock());
 
  drawSprites();
}

function deductFood(){
if(foodS<=0){
  foodS=0
  
}
else{
  foodS--
}
foodObj.updateFoodStock(foodS)
database.ref('/').update({
Food:foodS,
  FeedTime:hour()
})
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
