var canvas;
var angle;
var angle;
var x;
var y;

var p = QuickSettings.create(30, 80, 'Fractal Input')
  .addRange('rotate', -Math.PI, Math.PI, 0, 0.05, draw);

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  background(0);
  rectMode(CENTER);
  //angleMode(DEGREES);
  x = 0.0;
  y = 0.0;
}

function draw() {
  background(0);
  //
  //  push();
  // translate(mouseX , mouseY);
  // fill(50,50,200);
  // stroke(255);
  // rotate(angle);
  // rect(0, 0, 200, 50);
  //  pop();
  //
  // angle += mouseX * 0.02;
  // x += mouseX;
  // y += mouseY;
  // angle = angle.value();
  angle = p.getValue('rotate');
  stroke(255);
  translate(width / 2, height);
  branch(165);
}


function branch(length) {
  if (length < 30) {
    stroke(random(255), random(255), random(255));
  } else {
    stroke(46, 139, 87);
  }
  strokeWeight(3);
  line(0, 0, 0, -length);
  translate(0, -length);
  if (length > 10) {

    push();
    rotate(angle);
    branch(length * 0.72);
    pop();

    push();
    rotate(-angle);
    branch(length * 0.72);
    pop();

  }


}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
