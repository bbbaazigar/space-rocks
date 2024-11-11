import { Asteroid, AsteroidSize } from "./asteroid.js";
import { Keyboard, Keys } from "./keyboard.js";
import { Ship } from "./ship.js";
import { Vec2 } from "./vec2.js";
import { ctx, HEIGHT, WIDTH } from "./view.js";

const keyboard = new Keyboard(window);
const ship = new Ship(
    new Vec2(80, 80),
    new Vec2(20, 0),
    keyboard
);

const asteroid = new Asteroid(
    new Vec2(300,200),
    new Vec2(110,10),
    AsteroidSize.Medium,
    2
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
    
    asteroid.update(deltaTime);
    asteroid.draw(ctx);

    requestAnimationFrame((newTimestamp) => loop(newTimestamp, ctx));
}

function clearScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#101010";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}


requestAnimationFrame((timestamp) => loop(timestamp, ctx));