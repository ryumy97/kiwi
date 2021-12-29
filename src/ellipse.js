export class Ellipse {
    constructor(x, y, width, height, rotation) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        
        const random = Math.floor(Math.random() * 3);
        if (random === 0) {
            this.fillStyle = '#D32F2F';
        }
        else if (random === 1) {
            this.fillStyle = '#FFF8E1';
        }
        else {
            this.fillStyle = '#FFCCBC';
        }
        this.kappa = .5522848 + Math.random() * 0.15;
        this.widthMultiple = Math.random() * 0.01 + 1;
        this.heightMultiple = Math.random() * 0.2 + 1;
    }

    resize(x, y, width, height, rotation) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }

    draw(ctx) {
        this.drawEllipse(ctx, this.x, this.y, this.width * this.widthMultiple, this.height * this.heightMultiple, this.rotation, this.kappa);
    }

    drawEllipse(ctx, x, y, width, height, rotation, kappa) {
        const ox = (width / 2) * kappa;
        const oy = (height / 2) * kappa;
        const xStart = x - width / 2;
        const yStart = y - height / 2;
        const xEnd = x + width / 2;
        const yEnd = y + height / 2;
        ctx.save();

        ctx.translate(x, y);

        ctx.rotate(2 * Math.PI * rotation);   

        ctx.translate(-x, -y);

        ctx.beginPath();
        ctx.moveTo(xStart, y);
        
        ctx.bezierCurveTo(
            xStart, y + oy,
            x - ox, yEnd,
            x, yEnd
        )
        ctx.bezierCurveTo(
            x + ox, yEnd,
            xEnd, y + oy,
            xEnd, y
        )
        ctx.bezierCurveTo(
            xEnd, y - oy,
            x + ox, yStart,
            x, yStart
        )
        ctx.bezierCurveTo(
            x - ox, yStart,
            xStart, y - oy,
            xStart, y
        )
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.restore();
    }
}