// Mazmorra race - Sergio Sosa Bautista V - 1.0

// variables 
var canvas;
var ctx; 
var fps = 50;
var MainPlayer;
var MeanPlayer = [];
// height and width of every spot at the game field
var heightF = 50;
var widthF = 50;

// images to use at the game, creating the vars
var brickbrown;
var brickgrey;
var doorClosed;
var doorOpen;
var key;
var playerWalkOne;
var playerWalkTwo;
var playerWalkThree;
var playerMeanOne;
var PlayerMeanTwo;

// Message Text
let textMessage = document.getElementById('textMessage');
let StartGame = document.getElementById('StartGame');

var gameField = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,1,0,1,4,0,1,1,1,1,0,0,1,1,0,1,1],
    [1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1],
    [1,1,0,1,1,0,0,0,1,1,0,1,0,1,0,2,1],
    [1,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1],
    [1,0,1,0,1,0,1,1,0,1,1,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,0,1,0,0,0,1,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,1,1,0,0,1],
    [1,1,0,1,1,0,1,0,0,1,0,0,0,0,1,0,1],
    [1,1,0,1,0,0,0,0,1,0,1,0,1,0,0,0,1],
    [1,0,0,1,1,1,1,0,1,0,0,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]   
];

function Drawfield() {

    var color;

    // going through every row
    for(y = 0; y < 12; y++) {
        //going through every spot inside the row
        for(x = 0; x < 17; x++) {
            // insert an image according to the number inside the array "gamefield"
            if(gameField[y][x] == 0) {
                ctx.drawImage(brickgrey, x*widthF, y*heightF, widthF, heightF)
            }

            if(gameField[y][x] == 1) {
                ctx.drawImage(brickbrown, x*widthF, y*heightF, widthF, heightF)
            }

            if(gameField[y][x] == 2) {
                ctx.drawImage(doorClosed, x*widthF, y*heightF, widthF, heightF)
            }

            if(gameField[y][x] == 3) {
                ctx.drawImage(doorOpen, x*widthF, y*heightF, widthF, heightF)
            }

            if(gameField[y][x] == 4) {
                ctx.drawImage(brickgrey, x*widthF, y*heightF, widthF, heightF)
                ctx.drawImage(key, x*widthF, y*heightF, widthF, heightF)
            }
        }

    }
}

// try to see if the move effect works on the bad guy
var enemy = function(x, y) {
    // giving the coordinates
    this.x = x;
    this.y = y;

    // creating vars to make a delay inside the function to make a smooth movement
    this.delay = 12;
    this.playerCounter = 0;
    this.frame = 0; //0-3

    // creating the function to change the frame so we will create the delay
    // we will use the frame later in pur drawPlayer function to choose the img to show
    this.changeFrame = function() {
        if(this.frame < 1) {
            this.frame++;
          }
          else{
            this.frame = 0;
          }
    }
    // creating the funtion draw for the main player
    this.drawPlayer = function() {
        // choosing the img to see our player walking and calling changeFrame() to
        // create a delay between our calls to see a smooth animation
        if(this.playerCounter < this.delay){
            this.playerCounter++;
          }
          else{
            this.playerCounter = 0;
            this.changeFrame();
          }

        // importing an image according to an if statement
        if(this.frame == 0) {
            ctx.drawImage(playerMeanOne, this.x*widthF, this.y*heightF, widthF, heightF)
        }

        if(this.frame == 1) {
            ctx.drawImage(PlayerMeanTwo, this.x*widthF, this.y*heightF, widthF, heightF)
        }
    }

    // Here we will give a random direction to our enemy
    this.direction = Math.floor(Math.random()*4);
    // Here we will create a delay so our enemys don't move to fast
    this.delayTwo = 50;
    // We will check if our enemy is going to hit a wall or if it can move 
    this.checkCollision = function(x,y){
        var collision = false;
        if(gameField[y][x]==1){
          collision = true;
        }
        return collision;
    }

    this.move = function(){

        MainPlayer.enemyCollision(this.x, this.y);
  
        if(this.counter < this.delayTwo){
          this.counter++;
        }  else{
          this.counter = 0;
  
            //ARRIBA
            if(this.direction == 0){
                if(this.checkCollision(this.x, this.y - 1)==false){
                this.y--;
                }
                else{
                this.direction = Math.floor(Math.random()*4);
                }
            }
  
            //ABAJO
            if(this.direction == 1){
                if(this.checkCollision(this.x, this.y + 1)==false){
                this.y++;
                }
                else{
                this.direction = Math.floor(Math.random()*4);
                }
            }
  
            //IZQUIERDA
            if(this.direction == 2){
                if(this.checkCollision(this.x - 1, this.y)==false){
                this.x--;
                }
                else{
                this.direction = Math.floor(Math.random()*4);
                }
            }
  
            //IZQUIERDA
            if(this.direction == 3){
                if(this.checkCollision(this.x + 1, this.y)==false){
                this.x++;
                }
                else{
                this.direction = Math.floor(Math.random()*4);
                }
            }
        }
    }
}

// setting the object player 
var player = function() {
    // giving the coordinates
    this.x = 1;
    this.y = 10;
    // when the player needs to pick up the key this value wiil be false 
    this.llave = false;
    
    // creating vars to make a delay inside the function to make a smooth movement
    this.delay = 7;
    this.playerCounter = 0;
    this.frame = 0; //0-3

    // creating the function to change the frame so we will create the delay
    // we will use the frame later in pur drawPlayer function to choose the img to show
    this.changeFrame = function() {
        if(this.frame < 3) {
            this.frame++;
          }
          else{
            this.frame = 0;
          }
    }
    // creating the funtion draw for the main player
    this.drawPlayer = function() {
        // choosing the img to see our player walking and calling changeFrame() to
        // create a delay between our calls to see a smooth animation
        if(this.playerCounter < this.delay){
            this.playerCounter++;
          }
          else{
            this.playerCounter = 0;
            this.changeFrame();
          }

        // importing an image according to an if statement
        if(this.frame == 0) {
            ctx.drawImage(playerWalkOne, this.x*widthF, this.y*heightF, widthF, heightF)
        }

        if(this.frame == 1) {
            ctx.drawImage(playerWalkTwo, this.x*widthF, this.y*heightF, widthF, heightF)
        }

        if(this.frame == 2) {
            ctx.drawImage(playerWalkThree, this.x*widthF, this.y*heightF, widthF, heightF)
        }

        if(this.frame == 3) {
            ctx.drawImage(playerWalkTwo, this.x*widthF, this.y*heightF, widthF, heightF)
        }

    }

    // checking if we crash with the enemy
    this.enemyCollision = function(x,y){
        if(this.x == x && this.y == y){
            this.kill();
        }
    
    }

    // creating a condition that will check if the number inside the position at the 
    // gameField is equal to 1, this is checking if that is a place where we can not go
    this.margin = function (x,y) {
        
        var collision = false;
        if(gameField[y][x] == 1 ) {
        collision = true;
        }
        return collision;
    }
    // setting the functions to move our player, this functions still need to be call by some 
    // event listener to be executed
    this.arriba = function () {
        
        // with the if statement we will check if at the position we are going contains a wall
        // where we cannot go. we call margin that is the function checking the value inside the
        // sport where we are going
        if(this.margin(this.x,this.y-1) == false) {
            this.y --;
            this.specialFunctions();
        }
    }

    this.abajo = function () {
        if(this.margin(this.x,this.y+1) == false) {
            this.y ++;
            this.specialFunctions();
        }
    }

    this.izquierda = function () {
        if(this.margin(this.x-1,this.y) == false) {
            this.x --;
            this.specialFunctions();
        }
    }

    this.derecha = function () {
        if(this.margin(this.x+1,this.y) == false) {
            this.x ++;
            this.specialFunctions();
        }
    }

    // victory fucntion will be called inside special functions when the conditions to win are met
    this.victory = function () {
        
        // we set the door to the image with the door open
        gameField[3][15] = 3;
        
        // we change the text to show a neew message
        textMessage.innerHTML = 'Has ganado';
        // we will wait 3 seconds to change the text back to the first text
        setTimeout(() => {
            textMessage.innerHTML = 'recoge la llave';
            // set the door to be closed again
            gameField[3][15] = 2;
            // place the key back to the starting point
            gameField[2][4] = 4;
            // we take our player bakc to the start point
            this.x = 1;
            this.y = 10;
        }, 3000);
        
    }

    // dead, we are calling this function inside enemyCollision 
    this.kill = function(){
        console.log('Has perdido!');
        // taking our player to the start point
        this.x = 1;
        this.y = 10;
        // telling the game that with the kill we lost the key
        this.llave = false;
        // put the key back to the original spot
        gameField[2][4] = 4;
        textMessage.innerHTML = 'recoge la llave';
    }

    // specialFunctions will be the place where we will check the conditions to call a certain 
    // function like victory, kill and much more
    this.specialFunctions = function() {
        var objectPlace = gameField[this.y][this.x]; 
        
        // getting the key
        if(objectPlace == 4) {
            // telling the game that we picked up the key
            this.llave = true;
            // changing the array to show only the nrick
            gameField[this.y][this.x] = 0;
            textMessage.innerHTML = 'Ve a la puerta';
        }
        // conditions to call the victory
        if(objectPlace == 2) {
            // checing if we have the key
            if(this.llave == true) {
                this.victory();
            } else {
                textMessage.innerHTML = 'Te falta la llave';
            }
        }
    }
}

function Start() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // creating the main player
    MainPlayer = new player();
    MeanPlayer.push(new enemy(5,2));
    MeanPlayer.push(new enemy(12,2));

    // the tilemaps are images created specially to be used at this canvas
    // here i will call every image inside a var to use it later in the code
    brickbrown = new Image();
    brickbrown.src = './img/brickBrown.png';

    brickgrey = new Image();
    brickgrey.src = './img/brickGrey.png';

    playerWalkOne = new Image();
    playerWalkOne.src = './img/Player Blue/playerBlue_walk1.png';

    playerWalkTwo = new Image();
    playerWalkTwo.src = './img/Player Blue/playerBlue_walk2.png';

    playerWalkThree = new Image();
    playerWalkThree.src = './img/Player Blue/playerBlue_walk3.png';

    doorClosed = new Image();
    doorClosed.src = './img/doorClosed.png';

    doorOpen = new Image();
    doorOpen.src = './img/doorOpen.png';

    key = new Image();
    key.src = './img/key.png';

    playerMeanOne = new Image();
    playerMeanOne.src = './img/slimeGreen.png';

    PlayerMeanTwo = new Image();
    PlayerMeanTwo.src = './img/slimeGreen_move.png';

    // keyboard event
    document.addEventListener('keydown', function(key) {

        // we will call the function this.arriba = function () {} inside var jugador = function() {} 
        // if keydown up
        if(key.keyCode == 38) {
          MainPlayer.arriba();
        }
        // if keydown down
        if(key.keyCode == 40) {
          MainPlayer.abajo();
        }
        // if keydown left
        if(key.keyCode == 37) {
          MainPlayer.izquierda();
        }
        // if keydown right
        if(key.keyCode == 39) {
          MainPlayer.derecha();
        }
      });

    setInterval(function() {
        MainFunction();
    }, 1000/fps);
}

// the easiest way to erase and redraw the canvas is to modify the size, in this case
// we will modify the canvas but set again the same size
function EraseCanvas() {
    canvas.width = 850;
    canvas.height = 600 ;
}

// Main function will contain the function that needs to be executed all the time
function MainFunction() {
    EraseCanvas();
    Drawfield();
    MainPlayer.drawPlayer(); 
    for(c=0; c<MeanPlayer.length; c++) {
        MeanPlayer[c].drawPlayer();
        MeanPlayer[c].move();
    }
}