const CANVAS_ID = "gameCanvas";
const canvas = document.getElementById(CANVAS_ID) as HTMLCanvasElement;
if (!canvas) {
    throw new Error(`Could not load canvas ${CANVAS_ID}`);
}
const ctx = canvas.getContext("2d");

if (!ctx) {
    throw new Error(`Could not extract context from the canvas element.`);
}

const HEIGHT = canvas.height;
const WIDTH = canvas.width;

const player = {
    pos: {
        x: 400,
        y: 100
    }
}

let lastTime = 0;

/**
 * Main gameLoop
 * @param now {number}
 */
function loop(now: number, ctx: CanvasRenderingContext2D) {

    const deltaTime = (now - lastTime) / 1000; //dt in seconds
    lastTime = now;

    clearScreen(ctx);
    update(player, deltaTime);
    drawPlayer(ctx, player);

    requestAnimationFrame((newTimestamp) => loop(newTimestamp, ctx));
}

function clearScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

/**
 * Draws a triangle which is treated as the player. 
 * @param ctx {CanvasRenderingContext2D}
 * @param player {any}
 */
function drawPlayer(ctx: CanvasRenderingContext2D, player: any) {
    const height = 15;
    const width = 10;

    const points = [
        { x: height, y: 0 },
        { x: -height, y: -width },
        { x: -height, y: width }
    ];

    ctx.save(); // save old state so that we don't polute the ctx
    ctx.translate(player.pos.x, player.pos.y);
    ctx.strokeStyle = "white";
    ctx.beginPath();

    const tip = points[0];
    ctx.moveTo(tip.x, tip.y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.closePath();
    ctx.stroke();

    ctx.restore();

}

function update(player: any, dt: number) {
    player.pos.x += 150 * dt;
    player.pos.x %= WIDTH;
    console.log(player.pos.x, dt);
}

requestAnimationFrame((timestamp) => loop(timestamp, ctx));