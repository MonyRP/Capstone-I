var canvas;
var winW = window.innerWidth;
var winH = window.innerHeight;
var angle = 0.0;
var force = 0.0;
var distance = 0.0;
var torque = 0.0;

var settings = QuickSettings.create(80, 80, 'Torque Inputs')
  .addNumber('Force', 0, 100, 0, 0.5)
  .addNumber('Distance', 0, 100, 0, 0.5)
  .addNumber('Angle (degrees)', 0, 180, 0, 10);

function setup() {
  canvas = createCanvas(winW, winH);
  canvas.parent('canvas');
  background(100);
  rectMode(CENTER);
  angleMode(DEGREES);
}

function draw() {
  background(100);
  force = settings.getValue('Force');
  distance = settings.getValue('Distance');
  angle = settings.getValue('Angle (degrees)');

  torque = force * distance * Math.sin((angle * (Math.PI / 180)));

  push();
  translate(winW / 2, winH / 2);
  rotate(-angle);
  stroke(255);
  fill(50, 50, 200);
  rect(0, 0, 300, 30);
  fill(0);
  ellipse(0, 0, 15);
  pop();

  var angleInRad = (angle * (Math.PI / 180));

  stroke(255);
  text(torque.toFixed(2), winW - 100, 60);
  text(angleInRad.toFixed(2), winW - 100, 120);
  stroke(50, 50, 200);
}

function windowResized() {
  resizeCanvas(winW, winH);
}
