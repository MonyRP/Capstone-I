var canvas;
var canvasDiv = document.getElementById('canvas');
var canvasWidth = canvasDiv.offsetWidth;
var canvasHeight = canvasDiv.offsetHeight;
// Spring origin and weight vectors
var springOrigin;
var springWeight;
// Spring weight width and height
var springHeight;
var springWidth;
// Variables for Hooks law
var springForce;
var k;
var distance;
//
var gravity;
var velocity;

// Labels
var kLabel;
var massLabel;
var distanceLabel;
var springForceLabel;

// Inputs
var kInput;
var distanceInput;
var massInput;
var springForceInput;
var gravityCheckbox;
var frictionCheckbox;

// Booleans for hoovering and pulling
var hovering = false;
var pulling = false;

// friction
var friction;

function setup() {
  canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent('canvas');
  // canvas.style('display', 'block');

  background(50);
  rectMode(CORNER);

  inputsPos = createVector(120, 100);

  kLabel = createDiv('k (N/m)');
  kLabel.parent('controls');
  kLabel.position(inputsPos.x - 70, inputsPos.y - 20);
  kInput = createInput('0.35', 'number');
  kInput.parent('controls');
  kInput.elt.step = 0.01;
  kInput.size(120);
  kInput.position(inputsPos.x, inputsPos.y - 20);

  massLabel = createDiv('Mass (kg)');
  massLabel.parent('controls');
  massLabel.position(inputsPos.x - 75, inputsPos.y + 60);
  massInput = createInput('30', 'number');
  massInput.parent('controls');
  massInput.elt.step = 1;
  massInput.size(120);
  massInput.position(inputsPos.x, inputsPos.y + 60);

  distanceLabel = createDiv('Change<br>in x (m)');
  distanceLabel.parent('controls');
  distanceLabel.position(inputsPos.x - 70, inputsPos.y + 140);
  distanceInput = createInput('0', 'number');
  distanceInput.parent('controls');
  distanceInput.elt.step = 0.10;
  distanceInput.size(120);
  distanceInput.position(inputsPos.x, inputsPos.y + 150);

  springForceLabel = createDiv('Spring<br>Force (N)');
  springForceLabel.parent('controls');
  springForceLabel.position(inputsPos.x - 70, inputsPos.y + 230);
  springForceInput = createInput('0', 'number');
  springForceInput.parent('controls');
  springForceInput.elt.step = 0.10;
  springForceInput.size(120);
  springForceInput.position(inputsPos.x, inputsPos.y + 240);

  gravityCheckbox = createCheckbox('Gravity', true);
  gravityCheckbox.parent('controls');
  gravityCheckbox.position(inputsPos.x - 70, inputsPos.y + 330);
  gravityCheckbox.changed(changeGravity);

  frictionCheckbox = createCheckbox('Friction', true);
  frictionCheckbox.parent('controls');
  frictionCheckbox.position(inputsPos.x + 50, inputsPos.y + 330);
  frictionCheckbox.changed(changeFriction);

  springHeight = 80;
  springWidth = 80;
  gravity = 0.981;
  friction = 0.96;

  springOrigin = createVector(windowWidth * 0.35, 200);
  springWeight = createVector(windowWidth * 0.35, 200);

  velocity = createVector(0, 0);
}

function changeFriction(){
  if (this.checked()) {
    friction = 0.96;
  }else{
    friction = 1.0;
  }
}

function changeGravity(){
  if (this.checked()) {
    gravity = 0.981;
  }else{
    gravity = 0.0;
  }
}

function draw() {
  background(150);
  fill(51, 25, 0);

  // gravityCheckbox.changed(changeGravity);


  distance = p5.Vector.sub(springOrigin, springWeight); // Get distance between origin and spring weight
  springForce = p5.Vector.mult(distance, Number(kInput.value())); // Hooks law in action
  springForce.div(3);


  velocity.mult(friction); // Add artificial friction to settle spring weight
  velocity.add(springForce); // Calculate the velocity of the spring weight by adding acceleration wich is the springforce
  velocity.add(0, gravity * (Number(massInput.value())/3)); // Add gravity to velocity vector

  // If negative mass is entered, reset to zero
  if (massInput.value() < 0) {
    massInput.value(0);
  }

  // Check if spring weight is being pulled on. If not calculate position as normal
  // if (!pulling) {
    springWeight = p5.Vector.add(springWeight, velocity);
  // }

  // If spring weight is being pulled, set set position to mouse position
  if (pulling) {
    springWeight.x = mouseX;
    springWeight.y = mouseY;
  }

  // Display change in x and spring force
  distanceInput.value(distance.mag().toFixed(1));
  springForce.mult(3);
  springForceInput.value(springForce.mag().toFixed(1));

  // Check if mouse is hovering over spring weight
  if (collidePointRect(mouseX, mouseY, springWeight.x - springWidth / 2, springWeight.y - springHeight / 2, springWidth, springHeight)) {
    hovering = true;
  } else {
    hovering = false;
  }

  // Drow spring origin, weight, and line between them.
  fill(100);
  stroke(0);
  strokeWeight(2);
  ellipse(springOrigin.x, springOrigin.y, 20); //Spring base

  fill(50, 50, 200);
  stroke(0);
  rect(springWeight.x - springWidth / 2, springWeight.y - springHeight / 2, springWidth, springHeight); //Spring weight
  line(springOrigin.x, springOrigin.y, springWeight.x, springWeight.y); // Line connecting spring origin and weight

}

function windowResized() {
  canvasWidth = canvasDiv.offsetWidth;
  resizeCanvas(canvasWidth, windowHeight);
}

// If mouse is pressed while hovering over springweight, spring weight is being pulled.
function mousePressed() {
  if (hovering) {
    pulling = true;
  }
}

// If mouse is released, spring weight is not being pulled.
function mouseReleased() {
  pulling = false;
}
