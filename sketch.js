var generation;
var population;
var simSpeed;
var rectSize;
var paused;
var currGen;
var nextGen;

function setup()
{
    createCanvas(640, 480);
    generation = 0;
    simSpeed = 10;
    rectSize = 10;
    paused = false;
    currGen = initArray();
    nextGen = initArray();
}

function draw()
{
    background(0);
    noStroke();
    fill('white');

    population = 0; // Reset population

    drawCells();
    drawGUI();

    if (!paused && (frameCount % simSpeed) === 0)
    {
        var tmp = currGen;
        currGen = getNextGen();
        nextGen = tmp;
        generation++;
    }
}

function keyPressed()
{
    if (keyCode === 32) // Spacebar
        paused = !paused;
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
        for (var j = 0; j < currGen[i].length; j++) {
            if (currGen[i][j]) {
                population++;
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

function countNeighbours(row, col) {
    row = row - 1;
    col = col - 1;
    var count = 0;
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            if ((currGen[row + i] !== undefined) &&
                 currGen[row + i][col + j] !== undefined) {
                count += currGen[row + i][col + j];
            }
        }
    }
    return count;
}

function getNextGen() {
    for (var i = 0; i < currGen.length; i++) {
        for (var j = 0; j < currGen[i].length; j++) {
            var sum = countNeighbours(i, j);
            if (sum === 3) {
                nextGen[i][j] = true;           // Alive
            } else if (sum === 4) {
                nextGen[i][j] = currGen[i][j];  // Unchanged
            } else {
                nextGen[i][j] = false;          // Dead
            }
        }
    }
    return nextGen;
}
