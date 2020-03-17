var generation;
var population;
var simSpeed;
var rectSize;

function setup()
{
    createCanvas(640, 480);
    generation = 0;
    population = 0;
    simSpeed = 10;
    rectSize = 10;
}

function draw()
{
    background(0);
    noStroke();
    fill('white');

    drawGUI();

    if ((frameCount % simSpeed) === 0) {
        // Do stuff
    }

}

function keyPressed()
{
}

function drawGUI() {
    textSize(16);
    text('Generation: ' + generation, 10, height - 15);
    text('Population: ' + population, 150, height - 15);
}
