import { Theme } from "../constants/themes.js";
import { Pattern } from "../sunPattern/pattern.js";

export class Fruit {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.pattern = new Pattern(x, y, radius);
    }

    resize(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        
        this.pattern.resize(x, y, radius);
    }

    move(x, y) {
        this.x = x;
        this.y = y;
        
        this.pattern.resize(x, y, this.radius);
    }

    draw(ctx) {
        this.drawSkin(ctx);
        this.drawCore(ctx);
    }

    drawSkin(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = Theme.fruit.skinColor;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x + this.radius * 0.98, this.y);
        ctx.arc(this.x, this.y, this.radius * 0.98, 0, Math.PI * 2);
        
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grd.addColorStop(0, Theme.fruit.fruitCoreColor);
        grd.addColorStop(1, Theme.fruit.circleColor);

        ctx.fillStyle = grd;
        ctx.fill();
    }

    drawCore(ctx) {
        this.pattern.draw(ctx);

        ctx.beginPath();
        ctx.moveTo(this.x + this.radius * 0.3, this.y);
        ctx.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2);
        
        ctx.fillStyle = Theme.fruit.fruitCoreColor;
        ctx.fill();
    }
}