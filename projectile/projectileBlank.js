// Create a blank canvas
var blankSketch = function (p) {
    var canvasDiv = document.getElementById('canvas');
    var canvasWidth = canvasDiv.offsetWidth;
    var canvasHeight = window.innerHeight * .95;

    // Initial Setup
    p.setup = function () {
        var canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent('canvas');
        p.background(150);

        p.noLoop();
    }
};