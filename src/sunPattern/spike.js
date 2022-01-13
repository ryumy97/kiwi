import { Theme } from "../constants/themes.js";

export class Spike {
    constructor(x, y, radius, angle, angleWidth) {
        this.randomValue = Math.random() * 0.2;

        this.x = x + radius * (0.6 + this.randomValue) * Math.cos(angle),
        this.y = y + radius * (0.6 + this.randomValue) * Math.sin(angle),
        this.x1 = x + radius * 0.3 * Math.cos(angle - angleWidth / 3),
        this.y1 = y + radius * 0.3 * Math.sin(angle - angleWidth / 3),
        this.x2 = x + radius * 0.3 * Math.cos(angle + angleWidth / 3),
        this.y2 = y + radius * 0.3 * Math.sin(angle + angleWidth / 3)
    }

    resize(x, y, radius, angle, angleWidth) {
        this.x = x + radius * (0.6 + this.randomValue) * Math.cos(angle),
        this.y = y + radius * (0.6 + this.randomValue) * Math.sin(angle),
        this.x1 = x + radius * 0.3 * Math.cos(angle - angleWidth / 3),
        this.y1 = y + radius * 0.3 * Math.sin(angle - angleWidth / 3),
        this.x2 = x + radius * 0.3 * Math.cos(angle + angleWidth / 3),
        this.y2 = y + radius * 0.3 * Math.sin(angle + angleWidth / 3)
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.fillStyle = Theme.fruit.fruitCoreColor;
        ctx.fill();
    }
}