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
    simSpeed = 5;
    rectSize = 10;
    paused = false;
    currGen = initArray();
    nextGen = initArray();
	loadSeed(QUEEN_BEE, 20, 28);
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

function loadSeed(pattern, row, col) {
    for (var i = 0; i < pattern.length; i++) {
        for (var j = 0; j < pattern[i].length; j++) {
            currGen[row + i][col + j] = pattern[i][j];
        }
    }
}

function drawGUI() {
    textSize(16);
    text('Generation: ' + generation, 10,  height - 15);
    text('Population: ' + population, 150, height - 15);
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

function countNeighbours(row, col) {
    row--; col--;
    var count = 0;
    for (var i = 0; i <= 2; i++) {
        for (var j = 0; j <= 2; j++) {
            var r = (row + i + currGen.length) % currGen.length;
            var c = (col + j + currGen[0].length) % currGen[0].length;
            count += currGen[r][c];
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
