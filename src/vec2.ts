export class Vec2 {
    constructor(
        public x: number,
        public y: number
    ) { }

    static fromAngle(angle: number): Vec2 {
        const angleInRadian = angle * Math.PI / 180;
        const x = Math.cos(angleInRadian);
        const y = Math.sin(angleInRadian);

        return new Vec2(x, y);
    }

    /**
     * https://en.wikipedia.org/wiki/Rotation_matrix
     * @param angle {number}
     */
    rotate(angle: number): Vec2 {
        const angleInRadian = angle * Math.PI / 180;
        const sin0 = Math.sin(angleInRadian);
        const cos0 = Math.cos(angleInRadian);

        const nx = this.x * cos0 - this.y * sin0;
        const ny = this.x * sin0 + this.y * cos0;

        return new Vec2(nx, ny);

    }

    add(that: Vec2): Vec2 {
        return new Vec2(this.x + that.x, this.y + that.y);
    }

    scale(factor: number): Vec2 {
        return new Vec2(this.x * factor, this.y * factor);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}