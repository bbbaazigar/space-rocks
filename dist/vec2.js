export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromAngle(angle) {
        const angleInRadian = angle * Math.PI / 180;
        const x = Math.cos(angleInRadian);
        const y = Math.sin(angleInRadian);
        return new Vec2(x, y);
    }
    /**
     * https://en.wikipedia.org/wiki/Rotation_matrix
     * @param angle {number}
     */
    rotate(angle) {
        const angleInRadian = angle * Math.PI / 180;
        const sin0 = Math.sin(angleInRadian);
        const cos0 = Math.cos(angleInRadian);
        const nx = this.x * cos0 - this.y * sin0;
        const ny = this.x * sin0 + this.y * cos0;
        return new Vec2(nx, ny);
    }
    add(that) {
        return new Vec2(this.x + that.x, this.y + that.y);
    }
    scale(factor) {
        return new Vec2(this.x * factor, this.y * factor);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
//# sourceMappingURL=vec2.js.map