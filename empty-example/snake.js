/**
 * Snake.js
 * the snake object and its functions
 */

 // we need a variable to keep track of the side of the grid
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0; // to keep track of how many blocks of history of the snake's length
  this.tail = [];

  this.score = 0;

  this.dir = function(x, y) {
    // receive the x & y value 
    // use those values to set this object's direction
    this.xspeed = x;
    this.yspeed = y;
  }

  this.restart = function() {
    this.total = 0;  // total equal 0
    this.tail = []; // tail back to none
  }

  this.eat = function(pos) {
    // dist function to calculate the distance between snake object x and y to where the food's x and y
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {  // if that distance is less than one pixel
      this.total++;  // when snake eats the food, total goes up
      this.score++;
      return true;
    } else {
      return false;
    }
  }
  
  this.die = function() {
    // loop though all the bits of tail,
    // see if snake hits its tail (not included its head)
    for (var i = 0; i < this.tail.length; i++) {
      var tailPos = this.tail[i]; // tail position
      var dt = dist(this.x, this.y, tailPos.x, tailPos.y);  // distance
      if (dt < 1) {
        console.log('dead!');
        noLoop();       // for debug
        this.total = 0;  // total equal 0
        this.tail = []; // tail back to none
      }
    }
  }

  this.update = function() {
    // Shifting only happens if we haven;t eaten 
    // if no food is enten, the total is the same as the existing array length
    // console.log(this.total);
    if (this.total === this.tail.length) {
      // an array would shift through all the spots
      // so, we need a loop to loop through the length of the tail minus one
      // it shifts the spots down so it can have a new shopt in the end of the array
      // The new spot will come in the end, so the other spots will shift down
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i+1]; 
      }
    }
    this.tail[this.total-1] = createVector(this.x, this.y);

    // a snake have this update function
    // which x value simply changes by the xspeed value
    this.x = this.x + this.xspeed * scl; 
    this.y = this.y + this.yspeed * scl; 

    // keep the snake object inside the canvas
    // keep the value x (y), constrain it between zero and the width (height) minus the scl of snake object
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }
  
  this.show = function() {
    // a white color 10 by 10 rectangle at position this.x, this.y
    fill('hsla(160, 100%, 50%, 0.5)');
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  }
}