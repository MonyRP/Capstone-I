var canvas;
var scribble = new Scribble();

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas');
  canvas.style('display', 'block');

  background(0);
}

function draw() {
  background(50);
  strokeWeight(3);

  stroke(255, 0, 0);
  scribble.scribbleRoundedRect(200, windowHeight / 2, 250, 250, 10);
  stroke(0, 255, 0);

  scribble.scribbleEllipse(500, windowHeight / 2, 250, 250);

  stroke(0, 0, 255);

  scribble.scribbleLine(700, (windowHeight / 2) + 120, 900, 430);

  stroke(138, 43, 226);
  scribble.scribbleRect(1100, windowHeight / 2, 200, 250);

}
