// constants
const FPS = 30;
const CELLSIZE = 20;
const CIRCLE_SIZE = 0.01;
const WAVE_RADIUS = 12;
const WAVE_SPEED = 1;
const WAVE_DURATION = 10;

// states
var board;

// initialize everything
// =====================

function setup() {

    // set up canvas
    canv = document.getElementById("canvas");
    ctx = canv.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // set up board
    var numColumns = Math.ceil(canvas.width / CELLSIZE);
    var numRows = Math.ceil(canvas.height / CELLSIZE);
    board = create2dArray(numColumns, numRows);

    // set up functions to run
    setInterval(loop, 1000 / FPS);
    window.addEventListener('mousemove', e => mousemove(e))
}

// track mouse movement
// ====================

function mousemove(e) {
    
    // get info about mouse movement
    var x = Math.floor(e.x / CELLSIZE);
    var y = Math.floor(e.y / CELLSIZE);
    var r = Math.sqrt(e.movementX ** 2 + e.movementY ** 2) * CIRCLE_SIZE;

    // for each cell, see how much this movement will affect it
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var dist = Math.sqrt((x - i) ** 2 + (y - j) ** 2);
            var radius = r * calculateRelativeRadius(dist);
            if (radius > 0) {
                board[i][j].push({r: radius, d: dist, iterations: 0});
            }
        }
    }
}

// draw the items
// ==============

function loop() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var radius = 0;
            for (var k = 0; k < board[i][j].length; k++) {
                var event = board[i][j][k];
                var r = calculateRadius(event.r, event.d, event.iterations);
                if (r < 0) {
                    board[i][j].splice(k, 1);
                    k--;
                } 
                else {
                    radius += r;
                    event.iterations++;
                }
            }
            if (radius > 0) drawCircle(i, j, radius, "white")
        }
    }
}

// helper functions
// ================

function create2dArray(x, y) {
    array = []
    for (var i = 0; i < x; i++) {
        var subArray = []
        for (var j = 0; j < y; j++) {
            subArray.push([]);
        }
        array.push(subArray);
    }
    return array;
}

function drawCircle(x, y, r, c) {
    xPos = (x + 0.5) * CELLSIZE;
    yPos = (y + 0.5) * CELLSIZE;
    rad = r * (CELLSIZE / 2);
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(xPos, yPos, rad, 0, Math.PI * 2);
    ctx.fill();
}

function calculateRelativeRadius(dist) {
    if (dist > WAVE_RADIUS) return 0;
    return 1 / (dist + 1);
}

function calculateRadius(r, d, iterations) {
    var time = iterations - d * WAVE_SPEED;
    if (time < 0) return 0;
    if (time > WAVE_DURATION) return -1;
    sinTime = time / WAVE_DURATION * Math.PI;
    return r * Math.sin(sinTime);
}