/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images.
*/


let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight-85;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 15;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png";

  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/hero.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/monster.png";
}

/**
 * Setting up our characters.
 *
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 *
 * The same applies to the monster.
 */

let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

let monsterX = 0;
let monsterY = Math.random()*canvas.height-32;
let monsterSpeed=5
let direction = 'down';

let score = 0;

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}

// Add other stuffs
let userName = document.getElementById('username')
let e = document.getElementById("startGameBtn");

//Put name on the herp
function printUserName() {
   ctx.fillText(`${userName.value}`, heroX-5, heroY-10);
 }

 // Make play button disappear
function toggle_visibility() {
      if(e.style.display == 'block') {
         e.style.display = 'none';
      }
      else
        { e.style.display = 'block'; }
}

// Put a time out
function isGameOver() {

}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);


  if (38 in keysDown) { // Player is holding up key
    heroY -= 5;
  }
  if (40 in keysDown) { // Player is holding down key
    heroY += 5;
  }
  if (37 in keysDown) { // Player is holding left key
    heroX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    heroX += 5;
  }

  // Get the player back in the game zone
  if (heroX < 0) {
    heroX = canvas.width
  } else if (heroX > canvas.width) {
    heroX = 0
  }
  if (heroY < 0) {
    heroY = canvas.height
  } else if (heroY > canvas.height) {
    heroY = 0
  }

  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    heroX <= (monsterX + 32)
    && monsterX <= (heroX + 32)
    && heroY <= (monsterY + 32)
    && monsterY <= (heroY + 32)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    monsterX=0
    monsterY = Math.abs(Math.round(Math.random()*canvas.height-32));
    score++
  }

  // Make monster move
  if (monsterX<(canvas.width-32)) {
    monsterX+=monsterSpeed
  }
  else {
    monsterX = 0
  }
  if (direction == 'down') {

    if (monsterY<=(canvas.height-32)) {
        monsterY += monsterSpeed;
    }
    else
    {
        direction = 'up';
    }
}
  else if (direction == 'up') {

    if (monsterY >= 0)
    {
        monsterY -= monsterSpeed;
    }
    else
    {
        direction = 'down';
    }
}
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage,0,0,canvas.width,canvas.height);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }
  ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 20);
  ctx.fillText(`You've defeated: ${score} Orc(s)`, 20, 40);
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update();
  render();
  printUserName();
  // Request to do this again ASAP. This is a special method
  // for web browsers.
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
