var canvas;
var canvasDiv = document.getElementById('canvas');
var canvasWidth = canvasDiv.offsetWidth;
var canvasHeight = canvasDiv.offsetHeight;
var winW = window.innerWidth;
var winH = window.innerHeight;
var angle = 0.0;
var force = 0.0;
var distance = 0.0;
var torque = 0.0;

var forceLabel;
var forceOutput;
var rLabel;
var rOutput;

var force;
var r;

var thetaLabel;
var theta;
var thetaOutput;

var forceVec;
var vec;
var leverLength;
var lever;



function setup() {
  canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent('canvas');
  background(100);
  // rectMode(CENTER);
  angleMode(DEGREES);

  inputsPos = createVector(120, 150);

  forceLabel = createDiv('Force');
  forceLabel.parent('controls');
  forceLabel.position(inputsPos.x - 65, inputsPos.y - 24);
  force = createSlider(0, 500, 100, 1);
  force.parent('controls');
  force.elt.step = 0.01;
  force.size(120);
  force.position(inputsPos.x, inputsPos.y - 20);

  forceOutput = createDiv(force.value());
  forceOutput.parent('controls');
  forceOutput.position(inputsPos.x + 130, inputsPos.y - 24);


  rLabel = createDiv('Length');
  rLabel.parent('controls');
  rLabel.position(inputsPos.x - 65, inputsPos.y + 55);
  r = createSlider(0, 250, 150, 1);
  r.parent('controls');
  r.elt.step = 0.10;
  r.size(120);
  r.position(inputsPos.x, inputsPos.y + 60);

  rOutput = createDiv(r.value());
  rOutput.parent('controls');
  rOutput.position(inputsPos.x + 130, inputsPos.y + 60);

  thetaLabel = createDiv('Theta');
  thetaLabel.parent('controls');
  thetaLabel.position(inputsPos.x - 65, inputsPos.y + 126);
  theta = createSlider(0, 180, 0, 1);
  theta.parent('controls');
  theta.elt.step = 1;
  theta.size(120);
  theta.position(inputsPos.x, inputsPos.y + 130);

  thetaOutput = createDiv(force.value());
  thetaOutput.parent('controls');
  thetaOutput.position(inputsPos.x + 130, inputsPos.y + 130);

}



function draw() {
  background(150);

  distance = createVector(r.value(), 0);
  angle = theta.value();
  doorAngle = torque / 695; //settings.getValue('Door Angle (degrees)');
  torque = distance.x * force.value() * Math.sin((angle * (Math.PI / 180)));

  forceOutput.html(force.value());
  rOutput.html(r.value());
  thetaOutput.html(theta.value());

  leverLength = createVector(250, 0);

  lever = createVector(500, 0);
  canvasWidth = canvasDiv.offsetWidth;

  push();
  translate((canvasWidth / 2), winH / 2); // Translate canvas (0, 0) position

  // Draw lever that will rotate
  rotate(-doorAngle);
  stroke(255);
  fill(50, 50, 200);
  rect(0, -10, leverLength.x, 20);
  fill(0);
  ellipse(0, 0, 25);


  // Draw Force vectors x component
  if (angle != 90 && force.value() != 0) {
    vec = createVector(-force.value() * cos(angle), 0);
    drawArrow(distance, vec, 'black');
    push();
    translate(distance.x, distance.y);
    textSize(18);
    fill(0);
    noStroke();
    text('Fx = ' + abs((-force.value() * cos(angle)).toFixed(2)), -force.value() * cos(angle) - 30, -13);
    pop();
  }

  // Draw Force vectors y component
  if (angle != 0 && angle != 180 && force.value() != 0) {
    vec = createVector(0, -force.value() * sin(angle));
    drawArrow(distance, vec, 'white');
    push();
    translate(distance.x, distance.y);
    textSize(18);
    fill(0);
    noStroke();
    text('Fy = ' + abs((-force.value() * sin(angle)).toFixed(2)), -38, -force.value() * sin(angle) - 10);
    pop();
  }

  // Draw Force vector
  if (force.value() != 0) {

    forceVec = createVector(distance.x, 0);
    vec = createVector(force.value() * cos(angle), force.value() * sin(angle));
    drawArrowInverse(forceVec, vec, 'red');
    push();
    translate(distance.x, distance.y);
    textSize(18);
    fill(0);
    noStroke();
    text('F = ' + force.value().toFixed(2), -50, 60);
    pop();
  }

  pop();



}

function windowResized() {
  canvasWidth = canvasDiv.offsetWidth;
  resizeCanvas(canvasWidth, windowHeight);
}


// draw an arrow for a vector at a given base position
function drawArrow(base, vec, color) {
  push();
  stroke(color);
  strokeWeight(4);
  fill(color);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  var arrowSize = 10;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}


function drawArrowInverse(base, vec, color) {
  push();
  stroke(color);
  strokeWeight(4);
  fill(color);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  var arrowSize = 10;
  triangle(10, arrowSize / 2, 10, -arrowSize / 2, 0, 0);
  pop();
}

function submitted() {

}

function windowResized() {
  var canvasWidth = canvasDiv.offsetWidth;
  resizeCanvas(canvasWidth, windowHeight);
}
