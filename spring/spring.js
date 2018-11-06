var canvas;
var canvasDiv = document.getElementById('canvas');
var canvasWidth = canvasDiv.offsetWidth;
var canvasHeight = canvasDiv.offsetHeight;
var springOrigin;
var springWeight;
var velocity;
var springForce;
var k;
var x;
var springLength;
var friction;
var gravity;

var kLabel;
var distanceLabel;
// var frictionLabel;
// var gravityLabel;
var kInput;
var distanceInput;
// var frictionInput;
// var gravityInput;

var massLabel;
var massInput;

var submit;

function setup() {
  canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent('canvas');
  // canvas.style('display', 'block');

  background(50);
  rectMode(CENTER);

  inputsPos = createVector(60, 50);

  kLabel = createDiv('k');
  kLabel.parent('controls');
  kLabel.position(inputsPos.x - 30, inputsPos.y);
  kInput = createInput('0.25', 'number');
  kInput.parent('controls');
  kInput.elt.step = 0.01;
  kInput.size(120);
  kInput.position(inputsPos.x, inputsPos.y);

  distanceLabel = createDiv('x');
  distanceLabel.parent('controls');
  distanceLabel.position(inputsPos.x - 30, inputsPos.y + 40);
  distanceInput = createInput('0', 'number');
  distanceInput.parent('controls');
  distanceInput.elt.step = 0.10;
  distanceInput.size(120);
  distanceInput.position(inputsPos.x, inputsPos.y + 40);

  massLabel = createDiv('Mass');
  massLabel.parent('controls');
  massLabel.position(inputsPos.x - 45, inputsPos.y + 80);
  massInput = createInput('20', 'number');
  massInput.parent('controls');
  massInput.elt.step = 1;
  massInput.size(120);
  massInput.position(inputsPos.x, inputsPos.y + 80);

  submit = createButton('submit');
  submit.position(inputsPos.x + 5, inputsPos.y + 180);
  submit.mousePressed(submitted);


  springLength = 100;
  friction = 0.95;
  gravity = 0.981;

  springOrigin = createVector(windowWidth * 0.40, 0);
  springWeight = createVector(windowWidth * 0.40, springLength + Number(distanceInput.value()));

  velocity = createVector(0, 0);
}


function submitted() {
  springWeight.y = springLength + Number(distanceInput.value());

}

function draw() {
  background(150);

  fill(51, 25, 0);
  // rect(windowWidth * 0.40, , 400, 20);


  var distance = p5.Vector.sub(springOrigin, springWeight);
  distance.setMag(distance.mag() - springLength);
  springForce = p5.Vector.mult(distance, Number(kInput.value()));

  velocity = p5.Vector.mult(velocity, friction);
  velocity = p5.Vector.add(velocity, springForce);
  velocity.add(0, gravity * Number(massInput.value()));

  springWeight = p5.Vector.add(springWeight, velocity);

  fill(100);
  stroke(0);
  strokeWeight(2);
  ellipse(springOrigin.x, springOrigin.y, 20); //Spring base

  fill(50, 50, 200);
  stroke(0);
  rect(springWeight.x, springWeight.y, 80, 80); //Spring weight

  line(springOrigin.x, springOrigin.y, springWeight.x, springWeight.y);

}
