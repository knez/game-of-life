var generation;
var population;
var simSpeed;
var rectSize;
var currGen;

function setup()
{
    createCanvas(640, 480);
    generation = 0;
    population = 0;
    simSpeed = 10;
    rectSize = 10;
    currGen = new initArray();
}

function draw()
{
    background(0);
    noStroke();
    fill('white');

    drawGUI();
    drawCells();

    if ((frameCount % simSpeed) === 0) {
        // Do stuff
    }

}

function keyPressed()
{
}

function initArray() {
    var arr = new Array(height / rectSize);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Uint8Array(width / rectSize);
    }
    return arr;
}

function drawCells() {
    for (var i = 0; i < currGen.length; i++) {
        console.log(currGen[i].length);
        for (var j = 0; j < currGen[i].length; j++) {
            if (currGen[i][j]) {
                rect(j * rectSize, i * rectSize, rectSize, rectSize);
            }
        }
    }
}

function drawGUI() {
    textSize(16);
    text('Generation: ' + generation, 10, height - 15);
    text('Population: ' + population, 150, height - 15);
}
