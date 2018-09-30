var canvas;
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
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  frameRate(60);
  pos = createVector(0, 0);

  background(200);
  angleMode(DEGREES);

  inputsPos = createVector(80, 20);

  initPosXLbl = createDiv('Pos x');
  initPosXLbl.position(inputsPos.x - 65, inputsPos.y);
  initPosX = createInput('0', 'number');
  initPosX.position(inputsPos.x, inputsPos.y);

  initPosYLbl = createDiv('Pos y');
  initPosYLbl.position(inputsPos.x - 65, inputsPos.y + 25);
  initPosY = createInput('0', 'number');
  initPosY.position(inputsPos.x, inputsPos.y + 25);

  initVel = createDiv('Velocity');
  initVel.position(inputsPos.x - 65, inputsPos.y + 50);
  initVel = createInput('35', 'number');
  initVel.position(inputsPos.x, inputsPos.y + 50);

  accX = createDiv('Wind');
  accX.position(inputsPos.x - 65, inputsPos.y + 75);
  accX = createInput('0', 'number');
  accX.elt.step = 0.01;
  accX.position(inputsPos.x, inputsPos.y + 75);
  accX.style('margin', '0');

  accY = createDiv('Gravity');
  accY.position(inputsPos.x - 65, inputsPos.y + 100);
  accY = createInput('9.81', 'number');
  accY.elt.step = 0.01;
  accY.position(inputsPos.x, inputsPos.y + 100);
  accY.style('margin', '0');

  angle = createDiv('Angle');
  angle.position(inputsPos.x - 65, inputsPos.y + 125);
  angle = createInput('60', 'number');
  angle.position(inputsPos.x, inputsPos.y + 125);

  submit = createButton('submit');
  submit.position(inputsPos.x + 5, inputsPos.y + 155);
  submit.mousePressed(submitted);

  reset = createButton('reset');
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
