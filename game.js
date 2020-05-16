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

let bgReady, heroReady, monsterReady, monsterReady2, monsterReady3, monsterReady4;
let bgImage, heroImage, monsterImage, monsterImage2, monsterImage3, monsterImage4;

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

  monsterImage2 = new Image();
  monsterImage2.onload = function () {
    // show the monster image
    monsterReady2 = true;
  };
  monsterImage2.src = "images/monster.png";

  monsterImage3 = new Image();
  monsterImage3.onload = function () {
    // show the monster image
    monsterReady3 = true;
  };
  monsterImage3.src = "images/monster.png";

  monsterImage4 = new Image();
  monsterImage4.onload = function () {
    // show the monster image
    monsterReady4 = true;
  };
  monsterImage4.src = "images/monster.png";
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
let monsterX2 = 0;
let monsterY2 = Math.random()*canvas.height-32;
let monsterX3 = 0;
let monsterY3 = Math.random()*canvas.height-32;
let monsterX4 = 0;
let monsterY4 = Math.random()*canvas.height-32;
let monsterSpeed=5;
let direction = 'down';
let direction2 = 'up';
let direction3 = 'up';
let direction4 = 'down';

let score = 0;
let highScore=0;
let history = [];

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

// Reset timer
function resetTimer() {
  startTime = Date.now()
  elapsedTime=0;
  heroX = canvas.width / 2;
  heroY = canvas.height / 2;

  monsterX = 0;
  monsterY = Math.random()*canvas.height-32;
  monsterX2 = 0;
  monsterY2 = Math.random()*canvas.height-32;
  monsterX3 = 0;
  monsterY3 = Math.random()*canvas.height-32;
  monsterX4 = 0;
  monsterY4 = Math.random()*canvas.height-32;
  monsterSpeed=5;

  document.getElementById('endGameNoti').innerHTML = null;
  document.getElementById('bestScore').innerHTML = null;
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

  if (
    heroX <= (monsterX2 + 32)
    && monsterX2 <= (heroX + 32)
    && heroY <= (monsterY2 + 32)
    && monsterY2 <= (heroY + 32)
  ) {


    monsterX2=0
    monsterY2 = Math.abs(Math.round(Math.random()*canvas.height-32));
    score++
  }

  if (
    heroX <= (monsterX3 + 32)
    && monsterX3 <= (heroX + 32)
    && heroY <= (monsterY3 + 32)
    && monsterY3 <= (heroY + 32)
  ) {


    monsterX3=0
    monsterY3 = Math.abs(Math.round(Math.random()*canvas.height-32));
    score++
  }

  if (
    heroX <= (monsterX4 + 32)
    && monsterX4 <= (heroX + 32)
    && heroY <= (monsterY4 + 32)
    && monsterY4 <= (heroY + 32)
  ) {


    monsterX4=0
    monsterY4 = Math.abs(Math.round(Math.random()*canvas.height-32));
    score++
  }

  // Add history and best score
  if (highScore<score) {
    highScore=score;
  }

  // Make monsters move
  if (monsterX<(canvas.width-32)) {
    monsterX+=monsterSpeed
  }
  else {
    monsterX = 0
  }
  if (monsterX2<(canvas.width-32)) {
    monsterX2+=monsterSpeed
  }
  else {
    monsterX2 = 0
  }
  if (monsterX3<(canvas.width-32)) {
    monsterX3+=monsterSpeed
  }
  else {
    monsterX3 = 0
  }
  if (monsterX4<(canvas.width-32)) {
    monsterX4+=monsterSpeed
  }
  else {
    monsterX4 = 0
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
  if (direction2 == 'down') {

    if (monsterY2<=(canvas.height-32)) {
        monsterY2 += monsterSpeed;
    }
    else
    {
        direction2 = 'up';
    }
  }
  else if (direction2 == 'up') {

    if (monsterY2 >= 0)
    {
        monsterY2 -= monsterSpeed;
    }
    else
    {
        direction2 = 'down';
    }
  }
  if (direction3 == 'down') {

    if (monsterY3<=(canvas.height-32)) {
        monsterY3 += monsterSpeed;
    }
    else
    {
        direction3 = 'up';
    }
  }
  else if (direction3 == 'up') {

    if (monsterY3 >= 0)
    {
        monsterY3 -= monsterSpeed;
    }
    else
    {
        direction3 = 'down';
    }
  }
  if (direction4 == 'down') {

    if (monsterY4<=(canvas.height-32)) {
        monsterY4 += monsterSpeed;
    }
    else
    {
        direction4 = 'up';
    }
  }
  else if (direction4 == 'up') {

    if (monsterY4 >= 0)
    {
        monsterY4 -= monsterSpeed;
    }
    else
    {
        direction4 = 'down';
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
  if (monsterReady2) {
    ctx.drawImage(monsterImage2, monsterX2, monsterY2);
  }
  if (monsterReady3) {
    ctx.drawImage(monsterImage3, monsterX3, monsterY3);
  }
  if (monsterReady4) {
    ctx.drawImage(monsterImage4, monsterX4, monsterY4);
  }
  ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 20);
  ctx.fillText(`You've defeated: ${score} Orc(s)`, 20, 40);
  ctx.fillText(`Your best: ${highScore} Orc(s)`, 20, 60);
  ctx.fillText(`You've scored: ${history}`, 20, 80)
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  if ((SECONDS_PER_ROUND - elapsedTime)>0) {
    update();
    render();
    printUserName();
    // Request to do this again ASAP. This is a special method
    // for web browsers.
    requestAnimationFrame(main);
  }
  else {
    toggle_visibility();
    document.getElementById('startGameBtn').innerHTML = `Click this to play again!`;
    document.getElementById('endGameNoti').innerHTML = `You defeated ${score} orcs`;
    document.getElementById('bestScore').innerHTML = `Best score: ${highScore}`;
    history.push(score);
    score=0;
  }
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
