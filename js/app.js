var X_INCREMENT = 101;
var Y_INCREMENT = 85;
// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
     this.x = 0;
    this.y = 50;
    this.width = 80;
    this.height = 50;
     
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt*800*Math.random();
    if(this.x > 500)
    { 
        this.x = -80; 
        var positions = [50, 135, 220];
        this.y = positions[getRandomInt(0, 2)];
    }
    
    if(this.collisions(player))
    {
        alert("Perdiste HA!");
        player.reset();
        
        
    }};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    Enemy.call(this);
    this.x = 200;
    this.y = 390;

    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    if(player.y<20)   
{
    
    player.reset();
}
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 390;
    

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collisions = function (object) {
    return (this.x < object.x + object.width  && this.x + this.width  > object.x &&
        this.y < object.y + object.height && this.y + this.height > object.y);
};



Player.prototype.handleInput = function(direction){
    console.log("Handle input");
    switch(direction){
    case 'left':
    if(this.x > 0){
        this.x -= X_INCREMENT;
    }
    break;
    case 'up':
    this.y -= Y_INCREMENT;
    break;
    case 'right':
    if(this.x < 390){
        this.x += X_INCREMENT;    
    }    
    break;
    case 'down':
    if(this.y < 390){
        this.y += Y_INCREMENT;
    }
    break;    

    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for (var i = 0; i < 3; i++){
    allEnemies.push(new Enemy());
    allEnemies[i].y = 50 + i*85;
  }
var player = new Player();
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
                          
    };
player.handleInput(allowedKeys[e.keyCode]);
});
