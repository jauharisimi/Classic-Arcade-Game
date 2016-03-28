//Initialize counter variables
var life = 5;
var score = 0;
var gemsnum = 0;

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
// Variables applied to each of our instances go here,
// we've provided one for you to get started
// The image/sprite for our enemies, this uses
// a helper we've provided to easily load images
    this.speed = Math.floor((Math.random() * 500) + 100);
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < 505){
        this.x = this.x +(this.speed * dt);
    } else {
        this.x = -(Math.floor((Math.random() * 5) + 1) * 101);
        this.y = (Math.floor((Math.random() * 3) + 1) * 83);
    }
    checkCollisions(this);
};
// You should multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for
// all computers.
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed){
    this.x = 202;
    this.y = 415;
    this.speed = Math.floor((Math.random() * 200) + 100);
    this.paused = false;
};

// If the player reaches water safely,
//reset the player position and
//increment the score by 20points and also
// update the value of score on the screen.
// check if the player has collided with the gems.

Player.prototype.update = function(dt){
    if(this.y <= 0){
        player.reset();
        score = score + 20;
        document.getElementById("score").innerHTML = "Score: " + score;
    }
    checkGemCollisions(this);
};

// Draw the player on the screen, required method of the game

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(playerImages[playerIndex]), this.x, this.y);
};
// Check the collisions with the enemy.
// If player is hit, reset the player position.
// If player's life is more than 0, subtract one life.
// Update life display on the screen.
// If life is equal to 0 then pop up the message of game over.
var checkCollisions = function() {
  for (var i = 0; i < this.allEnemies.length; i++) {
    if (Math.abs(this.player.x - this.allEnemies[i].x) < 50 && Math.abs(this.player.y - this.allEnemies[i].y) < 50) {
      this.player.reset();
        if (life >=1 ) {
            life = life - 1;
        }
        document.getElementById('life').innerHTML = 'Life: ' + life;
        if (life === 0){
           endGame();
        }
    }
    }
};
// Reset the player position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// set the movement and the position of the player in accordance to the key press direction.
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 0) {
        this.x -= 101;
    } else if (key === 'right' && this.x < 395) {
        this.x += 101;
    } else if (key === 'up' && this.y > 0) {
        this.y -= 83;
    } else if (key === 'down' && this.y < 400) {
        this.y += 83;
    }
    else if (key=== 'space') {
        if (this.paused) {
            this.paused = false;
        }

        else {
            this.paused = true;
        }
    }
    /**
     * Pause the game and ask to quit or resume when q is pressed.
     *  dialogue box
     */
    else if (key === 'q') {
        this.paused = true;
        var quit = confirm('Press OK to quit or CANCEL to resume.');

        if (quit) {
            window.close();
        }

        else {
            this.paused = false;
        }
    }

};
// If player all his 5 life then GAMEOVER message is popped up and the value of life and score and number of gems are reset.

var Gems = function(x,y){
    this.x = 20 + 120 * (Math.floor(Math.random() * 4));
    this.y = 100 + 50 * (Math.floor(Math.random() * 4));
    this.sprite = 'images/Gem Green.png';
};

Gems.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x * (dt);
    this.y * (dt);
};

// Draw the gems on the screen, required method for game
Gems.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var checkGemCollisions = function(){
    if (player.x < gems.x + 50 && player.x + 50 > gems.x &&
            player.y < gems.y + 50 && player.y + 50 > gems.y) {
            player.reset();
            score = score + 10;
            gemsnum++;
            document.getElementById("score").innerHTML = "Score: " + score;
            document.getElementById("Gems").innerHTML = " Gems: " + gemsnum;
            gems = new Gems();
        }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for (var i = 0; i <= 4; i++) {
   var enemy = new Enemy();
   allEnemies[i] = new Enemy();
    allEnemies.push(enemy);
}
var player = new Player();
var gems = new Gems();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//document.addEventListener('keyup', function(e) {
 document.addEventListener('keyup',function(e){
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space',
        81: 'q'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//variable for helper functions
var renderFlag = false;
var userSelections = [false];
var playerImages = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
    ];
var playerIndex;

/*helper functions*/

// selection of the player and change the border color of the player image when selected.
function playerClick (imgId, imgIndex) {
    playerIndex = imgIndex;
    var buttons = document.getElementsByClassName('playerImg');
    for (var i = 0, length = buttons.length; i < length; i++) {
       buttons[i].style.border = '3px solid white';
    }
    document.getElementById(imgId).style.border = '3px solid black';
    userSelections[0] = true;
}
// start button in HTML linked to startclick function and if player is not selected before then alert message display.
function startClick () {
    var selectionCount = 0;
    for (var i = 0, length = userSelections.length; i < length; i++) {
        if(userSelections[i] === true) {
           selectionCount++;
        }
    }
    if (selectionCount === 1) {
        document.getElementById("selection").style.display = "none";
        renderFlag = true;
    } else {
        alert("Please select the player.");
    }
}
// Once the player loses all his 5 lives a message of GameOver pops up.
function endGame(){
    renderFlag = false;
    if(life === 0){
        document.getElementById("gameOverMessage").style.display="block";
         score = 0;
        document.getElementById("score").innerHTML = "Score: " + score;
        life = 5;
        document.getElementById('life').innerHTML = "Life: "+ life;
        gemsnum = 0;
        document.getElementById("Gems").innerHTML = " Gems: " + gemsnum;
    }
}