// This is the sketch launcher for the canvas
var p5Sketch;
function runSketch(sketch) {
    clearFields();

    if (typeof p5Sketch !== 'undefined') {
        p5Sketch.remove();
    }

    p5Sketch = new p5(sketch, "canvas");
}

// Function to reset the fields on the screen for the Clear button
function resetControls() {
    runSketch(blankSketch);
    document.getElementById('velocity').value = '';
    document.getElementById('angle').value = '';
    clearFields();
}

// Function to get values at a given time
function specificTime() {
    var t = document.getElementById('specificTime').value;
    var g = 9.8;
    var v0 = document.getElementById('velocity').value;
    var theta = document.getElementById('angle').value * (Math.PI / 180);
    var v0x = v0 * Math.cos(theta);
    var v0y = v0 * Math.sin(theta);

    document.getElementById('specificHeight').value = (v0y * t - .5 * g * t**2).toFixed(3).concat(' meters');
    document.getElementById('specificRange').value = (t * v0x).toFixed(3).concat(" meters");
    document.getElementById('specificVelocity').value = Math.sqrt(v0x**2 + (v0y - g * t)**2).toFixed(3).concat(' m/s');
    document.getElementById('specificVX').value = v0x.toFixed(3).concat(' m/s');
    document.getElementById('specificVY').value = (v0y - g * t).toFixed(3).concat(' m/s');
}

// Clear all generated fields
function clearFields() {
    document.getElementById('currentTime').value = '';
    document.getElementById('currentHeight').value = '';
    document.getElementById('currentRange').value = '';
    document.getElementById('currentV').value = '';
    document.getElementById('currentVX').value = '';
    document.getElementById('currentVY').value = '';
    document.getElementById('specificTime').value = '';
    document.getElementById('specificHeight').value = '';
    document.getElementById('specificRange').value = '';
    document.getElementById('specificVelocity').value = '';
    document.getElementById('specificVX').value = '';
    document.getElementById('specificVY').value = '';
    document.getElementById('maxRange').value = '';
    document.getElementById('maxHeight').value = '';
    document.getElementById('flightTime').value = '';
}