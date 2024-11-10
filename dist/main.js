import { Keyboard, Keys } from "./keyboard.js";
import { Vec2 } from "./vec2.js";
const CANVAS_ID = "gameCanvas";
const canvas = document.getElementById(CANVAS_ID);
if (!canvas) {
    throw new Error(`Could not load canvas ${CANVAS_ID}`);
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error(`Could not extract context from the canvas element.`);
}
const HEIGHT = canvas.height;
const WIDTH = canvas.width;
const keyboard = new Keyboard(window);
const FORCE_MAG = 350;
const MAX_SPEED = 500;
const TURN_SPEED = 250;
const DRAG = 0.05;
const player = {
    pos: new Vec2(300, 100),
    velocity: new Vec2(0, 0),
    angle: 270,
    thrust: 0
};
let lastTime = 0;
/**
 * Main gameLoop
 * @param now {number}
 */
function loop(now, ctx) {
    const deltaTime = (now - lastTime) / 1000; //dt in seconds
    lastTime = now;
    clearScreen(ctx);
    update(player, deltaTime);
    drawPlayer(ctx, player);
    requestAnimationFrame((newTimestamp) => loop(newTimestamp, ctx));
}
function clearScreen(ctx) {
    ctx.fillStyle = "#181818";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}
/**
 * Draws a triangle which is treated as the player.
 * @param ctx {CanvasRenderingContext2D}
 * @param player {any}
 */
function drawPlayer(ctx, player) {
    const height = 20 * 1;
    const width = 10 * 1;
    const points = [
        new Vec2(height, 0),
        new Vec2(-height, -width),
        new Vec2(-height + height / 2, -width / 2),
        new Vec2(-height + height / 2, width / 2),
        new Vec2(-height, width)
    ].map(v => v.rotate(player.angle));
    const flame = [
        new Vec2(-height + height / 2, -width / 2),
        new Vec2(-height, 0),
        new Vec2(-height + height / 2, width / 2)
    ].map(v => v.rotate(player.angle));
    ctx.save(); // save old state so that we don't polute the ctx
    ctx.translate(player.pos.x, player.pos.y);
    ctx.strokeStyle = "white";
    // draw ship 
    ctx.beginPath();
    const tip = points[0];
    ctx.moveTo(tip.x, tip.y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.stroke();
    // draw flame
    if (player.thrust > 0) {
        ctx.beginPath();
        const flameTip = flame[0];
        ctx.moveTo(flameTip.x, flameTip.y);
        for (let i = 1; i < flame.length; i++) {
            ctx.lineTo(flame[i].x, flame[i].y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    ctx.restore();
}
function update(player, dt) {
    player.thrust = 0;
    if (keyboard.isKeyDown(Keys.A) || keyboard.isKeyDown(Keys.LEFT)) {
        player.angle -= TURN_SPEED * dt;
    }
    if (keyboard.isKeyDown(Keys.D) || keyboard.isKeyDown(Keys.RIGHT)) {
        player.angle += TURN_SPEED * dt;
    }
    if (keyboard.isKeyDown(Keys.W) || keyboard.isKeyDown(Keys.UP)) {
        player.thrust = FORCE_MAG;
    }
    // F = M * A
    // A = F / M say mass is 1 so A = F
    // dV = A * dt change in velocity since A = F dV = F * dt
    // velocity = velocity + dv = velocity + A * dt
    const force = Vec2.fromAngle(player.angle).scale(player.thrust);
    const mass = 1;
    const acc = force.scale(1 / mass);
    player.velocity = player.velocity.add(acc.scale(dt));
    const speed = player.velocity.magnitude();
    //don't exceed max speed.
    if (speed > MAX_SPEED) {
        player.velocity = player.velocity.scale(MAX_SPEED / speed);
    }
    // drag
    if (player.thrust == 0) {
        player.velocity = player.velocity.scale(1 - DRAG);
    }
    player.pos.x += player.velocity.x * dt;
    player.pos.y += player.velocity.y * dt;
    player.pos.x = ((player.pos.x % WIDTH) + WIDTH) % WIDTH;
    player.pos.y = ((player.pos.y % HEIGHT) + HEIGHT) % HEIGHT;
}
requestAnimationFrame((timestamp) => loop(timestamp, ctx));
//# sourceMappingURL=main.js.map