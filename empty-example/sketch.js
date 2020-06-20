var s;
var scl = 20; // size of the snake object
var apple;

let scoreElem;

function setup() {
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

  createCanvas(400, 400);
  s = new Snake();
  frameRate(10);  // lower the frame rate to have a retro sorta feel!!!
  foodGenLoction();
}

// function generate a new apple for the snake to pick up
function foodGenLoction() {
  // originally our canvas is not grid by grid
  // now we make every colum is divided by our scale
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  // create a vector as our food in a random spot
  apple = createVector(floor(random(cols)), floor(random(rows)));
  apple.mult(scl);
}

//// debug function
function mousePressed() {
  s.total++;
}

function draw() {
  background(51);
  if (s.die()) {
    const finalScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('GAME OVER! You Scored: ' + prevScore);
  }
  s.update();
  if (s.eat(apple)) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    foodGenLoction();
  }
  s.show();

  fill(255, 0, 100);
  rect(apple.x, apple.y, scl, scl);
}

// a key pressed function
function keyPressed() {
  if (keyCode === UP_ARROW) {
     s.dir(0, -1); // x is 0, y is -1, means up
  } else if (keyCode === DOWN_ARROW) {
     s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
  if (keyCode === 82) {
    s.restart();
  }
}
