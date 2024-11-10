import { Keyboard, Keys } from "./keyboard.js";
import { Ship } from "./ship.js";
import { Vec2 } from "./vec2.js";
import { ctx, HEIGHT, WIDTH } from "./view.js";

const keyboard = new Keyboard(window);
const ship = new Ship(
    new Vec2(100, 200),
    new Vec2(20, 0),
    keyboard
);

let lastTime = 0;

/**
 * Main gameLoop
 * @param now {number}
 * @param ctx {CanvasRenderingContext2D}
 */
function loop(now: number, ctx: CanvasRenderingContext2D) {

    const deltaTime = (now - lastTime) / 1000; //dt in seconds
    lastTime = now;

    clearScreen(ctx);
    ship.update(deltaTime);
    ship.draw(ctx);

    requestAnimationFrame((newTimestamp) => loop(newTimestamp, ctx));
}

function clearScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}


requestAnimationFrame((timestamp) => loop(timestamp, ctx));