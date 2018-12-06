var projectileSketch = function(p) {
    // Global variables
    var canvasDiv = document.getElementById('canvas');
    var canvasWidth = canvasDiv.offsetWidth;
    var canvasHeight = canvasDiv.offsetHeight;

    var windowHeight = window.innerHeight;

    var plot;
    var startTime;
    var lastStepTime = 0;

    var g = 9.807;
    var v0 = document.getElementById('velocity').value;
    var theta = document.getElementById('angle').value * (Math.PI / 180);
    var time = 0.0;
    var currentV, currentVY;

    var v0x = v0 * Math.cos(theta);
    var v0y = v0 * Math.sin(theta);

    var range = (v0**2 * Math.sin(2 * theta)) / g;
    var mHeight = (v0**2 * Math.sin(theta)**2) / (2 * g);
    var flight = (2 * v0 * Math.sin(theta)) / g;
    var axis = (mHeight > range) ? mHeight * 1.1:range * 1.1;


    // Initial setup
    p.setup = function() {
        // Create the canvas
        var canvas = p.createCanvas(canvasWidth, windowHeight * .95);
        canvas.parent('canvas');
        p.background(150);

        // Set values that will not change from frame to frame
        document.getElementById('currentVX').value = v0x.toFixed(3).concat(' m/s');
        document.getElementById('maxRange').value = range.toFixed(3).concat(' meters');
        document.getElementById('maxHeight').value = mHeight.toFixed(3).concat(' meters');
        document.getElementById('flightTime').value = flight.toFixed(3).concat(' seconds');

        // Set up times
        startTime = p.millis();
        lastStepTime = p.millis();

        // Prepare the first point
        var point = [];
        point[0] = new GPoint(0, 0);

        // Calculate graph dimensions
        var plotDim = (windowHeight < canvasWidth) ? windowHeight * .8:canvasWidth * .8;

        // Create the plot
        plot = new GPlot(p);
        plot.setPos(25, 25);
        plot.setDim(plotDim, plotDim);
        plot.setXLim(0, axis);
        plot.setYLim(0, axis);

        // Set up the plot
        plot.getXAxis().setAxisLabelText("Range (Meters)");
        plot.getYAxis().setAxisLabelText("Height (Meters)");
        plot.setBgColor(150);
        plot.setBoxBgColor(p.color(125));
        plot.setPointSize(10);
        plot.setPointColor(255, 255, 255);

        // Activate the panning effect
        plot.activatePanning();

        // Add the initial point
        plot.setPoints(point);
    };

    // Execute the sketch
    p.draw = function() {
        // Clean the canvas
        p.background(150);

        // Draw the plot
        plot.beginDraw();
        plot.drawBackground();
        plot.drawBox();
        plot.drawXAxis();
        plot.drawYAxis();
        plot.drawTopAxis();
        plot.drawRightAxis();
        plot.drawTitle();
        plot.drawGridLines(GPlot.BOTH);
        plot.getMainLayer().drawPoints();
        plot.endDraw();

        // Add new points every 100th of a second and stop when it hits the ground
        if (p.millis() - lastStepTime > 10 && time < flight) {
            var gp = calculatePoint();
            plot.addPoint(gp);
            // Remove the first point, used if only one point is wanted
            //plot.removePoint(0);

            currentV = p.sqrt(v0x**2 + (v0y - g * time)**2);
            currentVY = v0y - g * time;
            document.getElementById('currentTime').value = time.toFixed(3).concat(" sec");
            document.getElementById('currentHeight').value = gp.getY().toFixed(3).concat(' meters');
            document.getElementById('currentRange').value = gp.getX().toFixed(3).concat(' meters');
            document.getElementById('currentV').value = currentV.toFixed(3).concat(' m/s');
            document.getElementById('currentVY').value = currentVY.toFixed(3).concat(' m/s');
            lastStepTime = p.millis();
        }
    };

    // Update time and return a new GPoint
    function calculatePoint() {
        time = (p.millis() - startTime) / 1000;
        // Keep the time from going over flight time
        if (time > flight) {
            time = flight;
        }
        return new GPoint(time * v0x, (v0y * time) - (.5 * g * (time ** 2)));
    }

};