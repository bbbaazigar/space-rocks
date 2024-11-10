import { Keyboard, Keys } from "./keyboard.js";
import { Vec2 } from "./vec2.js";
import { HEIGHT, WIDTH } from "./view.js";

const SHIP_FORCE_MAG = 350;
const SHIP_MAX_SPEED = 500;
const SHIP_TURN_SPEED = 250;
const SHIP_DRAG = 0.05;

export class Ship {
    private angle: number;
    private thrust: number;
    constructor(
        private pos: Vec2,
        private velocity: Vec2,
        private input: Keyboard
    ) {
        this.angle = 0;
        this.thrust = 0;
    }

    update(dt: number) {

        this.thrust = 0;

        if (this.input.isKeyDown(Keys.A) || this.input.isKeyDown(Keys.LEFT)) {
            this.angle -= SHIP_TURN_SPEED * dt;
        }
        if (this.input.isKeyDown(Keys.D) || this.input.isKeyDown(Keys.RIGHT)) {
            this.angle += SHIP_TURN_SPEED * dt;
        }
        if (this.input.isKeyDown(Keys.W) || this.input.isKeyDown(Keys.UP)) {
            this.thrust = SHIP_FORCE_MAG;
        }

        // F = M * A
        // A = F / M say mass is 1 so A = F
        // dV = A * dt change in velocity since A = F dV = F * dt
        // velocity = velocity + dv = velocity + A * dt

        const force = Vec2.fromAngle(this.angle).scale(this.thrust);
        const mass = 1;
        const acc = force.scale(1 / mass);
        this.velocity = this.velocity.add(acc.scale(dt));

        const speed = this.velocity.magnitude();

        //don't exceed max speed.
        if (speed > SHIP_MAX_SPEED) {
            this.velocity = this.velocity.scale(SHIP_MAX_SPEED / speed);
        }

        // drag
        if (this.thrust == 0) {
            this.velocity = this.velocity.scale(1 - SHIP_DRAG);
        }


        this.pos.x += this.velocity.x * dt;
        this.pos.y += this.velocity.y * dt;

        //wrap around
        this.pos.x = ((this.pos.x % WIDTH) + WIDTH) % WIDTH;
        this.pos.y = ((this.pos.y % HEIGHT) + HEIGHT) % HEIGHT;

    }

    draw(ctx: CanvasRenderingContext2D) {
        const height = 20 * 1;
        const width = 10 * 1;

        const points = [
            new Vec2(height, 0),
            new Vec2(-height, -width),
            new Vec2(-height + height / 2, -width / 2),
            new Vec2(-height + height / 2, width / 2),
            new Vec2(-height, width)
        ].map(v => v.rotate(this.angle));

        const flame = [
            new Vec2(-height + height / 2, -width / 2),
            new Vec2(-height, 0),
            new Vec2(-height + height / 2, width / 2)
        ].map(v => v.rotate(this.angle));

        ctx.save(); // save old state so that we don't polute the ctx

        ctx.translate(this.pos.x, this.pos.y);
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
        if (this.thrust > 0) {
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
}