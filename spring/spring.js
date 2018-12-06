var canvas;
var canvasDiv = document.getElementById('canvas');
var canvasWidth = canvasDiv.offsetWidth;
var canvasHeight = canvasDiv.offsetHeight;
var springOrigin;
var springWeight;
var springHeight;
var springWidth;
var velocity;
var springForce;
var k;
var x;
var springLength;
var friction;
var gravity;

var kLabel;
var distanceLabel;

var kInput;
var distanceInput;


var massLabel;
var massInput;

var submit;

var hovering = false;
var pulling = false;

function setup() {
  canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent('canvas');
  // canvas.style('display', 'block');

  background(50);
  rectMode(CORNER);

  inputsPos = createVector(120, 150);

  kLabel = createDiv('k');
  kLabel.parent('controls');
  kLabel.position(inputsPos.x - 50, inputsPos.y - 20);
  kInput = createInput('0.25', 'number');
  kInput.parent('controls');
  kInput.elt.step = 0.01;
  kInput.size(120);
  kInput.position(inputsPos.x, inputsPos.y - 20);

  massLabel = createDiv('Mass');
  massLabel.parent('controls');
  massLabel.position(inputsPos.x - 55, inputsPos.y + 60);
  massInput = createInput('40', 'number');
  massInput.parent('controls');
  massInput.elt.step = 1;
  massInput.size(120);
  massInput.position(inputsPos.x, inputsPos.y + 60);

  distanceLabel = createDiv('Change<br>in x');
  distanceLabel.parent('controls');
  distanceLabel.position(inputsPos.x - 70, inputsPos.y + 120);
  distanceInput = createInput('0', 'number');
  distanceInput.parent('controls');
  distanceInput.elt.step = 0.10;
  distanceInput.size(120);
  distanceInput.position(inputsPos.x, inputsPos.y + 130);

  // submit = createButton('submit');
  // submit.parent('controls');
  // submit.position(inputsPos.x + 20, inputsPos.y+200 );
  // submit.mousePressed(submitted);

  springHeight = 80;
  springWidth = 80;
  springLength = 100;
  friction = 0.95;
  gravity = 0.981;

  springOrigin = createVector(windowWidth * 0.35, 200);
  springWeight = createVector(windowWidth * 0.35, springLength + 200);

  velocity = createVector(0, 0);
}




function draw() {
  background(150);

  fill(51, 25, 0);

  var distance = p5.Vector.sub(springOrigin, springWeight);
  distance.setMag(distance.mag() - springLength);
  springForce = p5.Vector.mult(distance, Number(kInput.value()));

  velocity = p5.Vector.mult(velocity, friction);
  velocity = p5.Vector.add(velocity, springForce);
  velocity.add(0, gravity * Number(massInput.value()));
  if (massInput.value() < 0) {
    massInput.value(0);
  }
  if(velocity > 0){

  velocity = 0;
  }



  if (!pulling) {
    springWeight = p5.Vector.add(springWeight, velocity);
  }

  if (pulling) {
    springWeight.x = mouseX;
    springWeight.y = mouseY;
  }

  distanceInput.value(springWeight.y.toFixed(0));

  if (collidePointRect(mouseX, mouseY, springWeight.x - springWidth / 2, springWeight.y - springHeight / 2, springWidth, springHeight)) {
    hovering = true;
  } else {
    hovering = false;
  }


  fill(100);
  stroke(0);
  strokeWeight(2);
  ellipse(springOrigin.x, springOrigin.y, 20); //Spring base

  fill(50, 50, 200);
  stroke(0);
  rect(springWeight.x - springWidth / 2, springWeight.y - springHeight / 2, springWidth, springHeight); //Spring weight

  line(springOrigin.x, springOrigin.y, springWeight.x, springWeight.y);

}

function mousePressed() {
  if (hovering) {
    pulling = true;
  }
}

function mouseReleased() {
  pulling = false;
}
