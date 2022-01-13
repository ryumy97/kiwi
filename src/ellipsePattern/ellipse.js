import { Theme } from "../constants/themes.js";

export class Ellipse {
    constructor(x, y, width, height, rotation) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        
        const random = Math.random();
        if (random < 0.2) {
            this.fillStyle = Theme.bird.featherColor1
        }
        else if (random < 0.35) {
            this.fillStyle = Theme.bird.featherColor2
        }
        else if (random < 0.5) {
            this.fillStyle = Theme.bird.featherColor3
        }
        else if (random < 0.6) {
            this.fillStyle = Theme.bird.featherColor4
        }
        else {
            this.fillStyle = Theme.bird.featherColor5
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
        // ctx.strokeStyle = Theme.common.black;
        // ctx.stroke();

        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.restore();
    }
}