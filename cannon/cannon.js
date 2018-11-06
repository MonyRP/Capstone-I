var p = QuickSettings.create()
  .addRange('width', 0, 100, 10, 1, draw)
  .addRange('height', 0, 100, 10, 1, draw)
  .addRange('gunXPos', 0, window.innerWidth, 500, 1, draw)
  .addRange('gunYPos', 0, window.innerHeight, 400, 1, draw)
  .addBoolean('fade', false, draw);

var canvas;
var winWidth;
var winHeight;
var gun;
var voice;
var gunSettings = {
  xPos: window.innerWidth,
  yPos: window.innerHeight
};

var pSet = {
  xVelMin: 0.0,
  xVelMax: 0.0,
  yVelMin: 0.0,
  yVelMax: 0.0,
  xAccMin: 0.0,
  xAccMax: 0.0,
  yAccMin: 0.0,
  yAccMax: 0.0,
  fade: 0.0
};



function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  winWidth = windowWidth;
  winHeight = windowHeight;
  background(0);
  gun = new ParticleGun(createVector(gunSettings.xPos, gunSettings.yPos));
}

function draw() {
  scale(2);
  background(0);
  // translate(500,500);
  gun.origin.x = p.getValue('gunXPos');
  gun.origin.y = p.getValue('gunYPos');

  gun.addParticle(createVector(random(-2, 0), random(-4, -2)), createVector(0, 0.0085), p.getValue('width'), p.getValue('height'), 255.0);
  gun.addParticle(createVector(random(0, 2), random(-4, -2)), createVector(0, 0.0085), p.getValue('width'), p.getValue('height'), 255.0);

  gun.run(p.getValue('fade'));

}

function windowResized() {
  resizeCanvas(winWidth, winHeight);
}
// ParticleGun constructor
var ParticleGun = function(position) {
  this.origin = position.copy();
  this.particles = [];
};
// Particle constructor
var Particle = function(position, velocity, acceleration, width, height, lifespan) {
  this.acceleration = acceleration.copy();
  this.velocity = velocity.copy();
  this.position = position.copy();
  this.width = p.getValue('width');
  this.height = random(height * 0.75, height);
  this.red = random(0, 255);
  this.green = random(0, 255);
  this.blue = random(0, 255);
  this.lifespan = lifespan;
};
// Updates Particle object position and velocity
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 0.5;
};

Particle.prototype.run = function(fade) {
  this.display(fade);
  this.update();
};

Particle.prototype.isDead = function() {
  if (this.position.y > winHeight + this.width) {
    return true;
  }
  // if (this.lifespan < 100) {
  //   return true;
  // }
};

ParticleGun.prototype.addParticle = function(velocity, acceleration, width, height, lifespan) {
  this.particles.push(new Particle(this.origin, velocity, acceleration, width, height, lifespan));
};

Particle.prototype.display = function(fade) {
  if (fade) {
    stroke(0, this.lifespan);
    fill(this.red, this.green, this.blue, this.lifespan);
  } else {
    stroke(0);
    fill(this.red, this.green, this.blue);
  }
  strokeWeight(2);
  ellipse(this.position.x, this.position.y, this.width);

};

ParticleGun.prototype.run = function(fade) {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    this.particles[i].run(fade);

    if (this.particles[i].isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
