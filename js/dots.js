// constants
const FPS = 10;
const DECAY = 2;
const CIRCLE_SIZE = 0.5;

// states
var events = [];

// initialize everything
// =====================

function setup() {

    // set up canvas
    canv = document.getElementById("canvas");
    ctx = canv.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // set up functions to run
    setInterval(loop, 1000 / FPS);
    window.addEventListener('mousemove', e => mousemove(e))
}

// track mouse movement
// ====================

function mousemove(e) {
    movement = Math.sqrt(e.movementX ** 2 + e.movementY ** 2) * CIRCLE_SIZE;
    events.push({x: e.x, y: e.y, r: movement});
}

// draw circles wherever the mouse moves
// =====================================

function loop() {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    for (var i = 0; i < events.length; i++) {
        e = events[i];
        drawCircle(e.x, e.y, e.r, "white");
        e.r -= DECAY;
        if (e.r <= 0) {
            events.splice(i, 1);
            i--;
        }
    }
}

// helper functions
// ================

function drawCircle(x, y, r, c) {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
}