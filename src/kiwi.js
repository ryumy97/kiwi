export class Kiwi {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.stageWidth = radius * 2;
        this.stageHeight = radius * 2;
    }

    resize(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.stageWidth = radius * 2;
        this.stageHeight = radius * 2;
    }

    draw(ctx) {
        this.drawBody(ctx, this.x, this.y);
    }

    drawBody(ctx, x, y) {
        ctx.beginPath();
        ctx.lineWidth = this.radius * 0.008

        ctx.moveTo(x - this.radius * 0.15, y - this.radius * 0.5);
        ctx.bezierCurveTo(
            x - this.radius * 0.05, y - this.radius * 0.5,
            x + this.radius * 0.05, y - this.radius * 0.55,
            x + this.radius * 0.15, y - this.radius * 0.56
        );
        ctx.bezierCurveTo(
            x + this.radius * 0.4, y - this.radius * 0.6,
            x + this.radius * 0.8, y - this.radius * 0.4,
            x + this.radius * 0.75, y + this.radius * 0.1
        )
        ctx.bezierCurveTo(
            x + this.radius * 0.5, y + this.radius * 0.7,
            x - this.radius * 0.25, y + this.radius * 0.5,
            x - this.radius * 0.4, y
        );
        ctx.quadraticCurveTo(
            x - this.radius * 0.15, y - this.radius * 0.15,
            x - this.radius * 0.15, y - this.radius * 0.5
        )
        
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill();

        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }
}