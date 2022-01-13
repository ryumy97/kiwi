import { Theme } from '../constants/themes.js';
import { Bird } from './bird.js';
import { Fruit } from './fruit.js';

export class Circle {
    constructor(x, y, radius, rotation, themeName) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.rotation = rotation;

        this.themeName = themeName;

        this.character = themeName === 'bird' 
            ? new Bird(this.x, this.y, this.radius)
            : new Fruit(this.x, this.y, this.radius)
    }

    resize(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.character.resize(this.x, this.y, this.radius);
    }

    move(x,y) {
        this.x = x;
        this.y = y;

        this.character.move(x, y)
    }
    
    rotate(rotation) {
        this.rotation = rotation
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.translate(-this.x, -this.y)

        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = Theme[this.themeName].circleColor;
        ctx.fill();

        this.character.draw(ctx);
        
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = Theme[this.themeName].circleColor;
        ctx.fill();

        ctx.restore();
    }
}
