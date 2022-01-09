import { Kiwi } from './kiwi.js';

export class Circle {
    constructor(stageWidth, stageHeight) {
        this.x = stageWidth / 2;
        this.y = stageHeight / 2;
        this.radius = stageHeight > stageWidth ? stageWidth / 3 : stageHeight / 3;

        this.kiwi = new Kiwi(this.x, this.y, this.radius);
    }

    resize(stageWidth, stageHeight) {
        this.x = stageWidth / 2;
        this.y = stageHeight / 2;
        this.radius = stageHeight > stageWidth ? stageWidth / 3 : stageHeight / 3;

        this.kiwi.resize(this.x, this.y, this.radius);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#00CED1'
        ctx.fill();
        
        this.kiwi.draw(ctx);
        
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius, this.y);
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = '#00CED1'
        ctx.fill();
    }
}
