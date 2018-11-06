var cnv;
var xPos = 0.0;
var yPos = 0.0;
var xSpeed = getRandom(-4, 4);
var ySpeed = getRandom(-4, 4);
var hit = false;
var ballOneDiameter = 75;
var ballTwoDiameter = 42;
var ballOneAngle;

function setup() {
  xPos = getRandom(0, windowWidth);
  yPos = getRandom(0, windowHeight);
  ballOneAngle = Math.atan(yPos / xPos);

  cnv = createCanvas(windowWidth, windowHeight);
  background(150, 150, 150);
}



function draw() {

  background(150, 150, 150);

  fill(50);
  // Ball one
  ellipse(xPos, yPos, ballOneDiameter, ballOneDiameter);


  // Ball that follows mouse (ball two)
  ellipse(mouseX, mouseY, ballTwoDiameter, ballTwoDiameter);

  // Check if balls collide
  hit = collideCircleCircle(xPos, yPos, ballOneDiameter, mouseX, mouseY, ballTwoDiameter);

  // If balls collide, change position and speed
  if (hit) {
    fill(0, 255, 0);
    xSpeed *= -1;
    ySpeed *= -1;

  }

  fill(50);

  // Display x and y position of ball one
  textSize(16);
  stroke(0);
  strokeWeight(1);
  text('x: ' + xPos.toFixed(2) + ' , ' + 'y: ' + yPos.toFixed(2), windowWidth - 180, 40);

  // If ball one goes off left or right of screen, change direction
  if (xPos >= windowWidth - ballOneDiameter / 2 + 10 || xPos <= ballOneDiameter / 2 - 10) {
    xSpeed *= -1;
  }

  // If ball one goes off top or bottom of screen, change direction
  if (yPos >= windowHeight - ballOneDiameter / 2 + 10 || yPos <= ballOneDiameter / 2 - 10) {
    ySpeed *= -1;
  }

  // Speed and direction of the ball
  xPos += xSpeed;
  yPos += ySpeed;
}

// Resizes canvas if window size is changed
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Method to get random decimal number
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
