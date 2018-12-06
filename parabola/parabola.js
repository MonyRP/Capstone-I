var canvas;
var canvasDiv = document.getElementById('canvas');
var canvasWidth = canvasDiv.offsetWidth;
var canvasHeight = canvasDiv.offsetHeight;
var initPosX;
var initPosY;
var initVel;
var accX;
var accY;
var angle;
var t;
var pos;
var vel;
var acc;
var submit;
var resets;
var run = false;
var inputsPos;

var initPosXLbl;
var initPosYLbl;
var initVelLbl;
var accXLbl;
var accYLbl;
var angleLbl;


function setup() {
  canvas = createCanvas(canvasWidth, windowHeight);
  canvas.parent('canvas');
  // canvas.style('display', 'block');
  frameRate(60);
  pos = createVector(0, 0);

  background(200);
  angleMode(DEGREES);

  inputsPos = createVector(60, 150);


  initVelLbl = createDiv('Velocity');
  initVelLbl.parent('controls');
  initVelLbl.position(inputsPos.x - 65, inputsPos.y + 50);
  initVel = createInput('35', 'number');
  initVel.parent('controls');
  initVel.position(inputsPos.x, inputsPos.y + 50);

  accXLbl = createDiv('Wind');
  accXLbl.parent('controls');
  accXLbl.position(inputsPos.x - 65, inputsPos.y + 75);
  accX = createInput('0', 'number');
  accX.parent('controls');
  accX.elt.step = 0.01;
  accX.position(inputsPos.x, inputsPos.y + 75);
  accX.style('margin', '0');

  accYLbl = createDiv('Gravity');
  accYLbl.parent('controls');
  accYLbl.position(inputsPos.x - 65, inputsPos.y + 100);
  accY = createInput('9.81', 'number');
  accY.parent('controls');
  accY.elt.step = 0.01;
  accY.position(inputsPos.x, inputsPos.y + 100);
  accY.style('margin', '0');

  angleLbl = createDiv('Angle');
  angleLbl.parent('controls');
  angleLbl.position(inputsPos.x - 65, inputsPos.y + 125);
  angle = createInput('60', 'number');
  angle.parent('controls');
  angle.position(inputsPos.x, inputsPos.y + 125);

  submit = createButton('submit');
  submit.parent('controls');
  submit.position(inputsPos.x + 5, inputsPos.y + 155);
  submit.mousePressed(submitted);

  reset = createButton('reset');
  reset.parent('controls');
  reset.position(inputsPos.x + 80, inputsPos.y + 155);
  reset.mousePressed(resets);

  t = 0.0;
  fill(0, 160, 0);
  rect(0, windowHeight - 100, windowWidth, 100);
}

function submitted() {
  pos = createVector(0, 0);
  vel = createVector(initVel.value() * cos(angle.value()), initVel.value() * sin(angle.value()) * -1);
  acc = createVector(accX.value() * 0.10, accY.value() * 0.10);
  run = true;
}

function resets() {
  background(200);
  fill(0, 160, 0);
  rect(0, windowHeight - 100, windowWidth, 100);
  t = 0.0;
  run = false;
}

function draw() {


  if (run) {
    if (pos.y < 1) {
      push();
      noStroke();
      fill(50);
      translate(50, windowHeight - 100);
      pos.x = 0.5 * acc.x * t * t + vel.x * t + initPosX.value();
      pos.y = 0.5 * acc.y * t * t + vel.y * t + initPosY.value();

      ellipse(pos.x, pos.y, 20, 20);
      t += 1;
    }
  }
}


function windowResized() {
  var canvasWidth = canvasDiv.offsetWidth;
  resizeCanvas(canvasWidth, windowHeight);
}
