import { EllipseGroup } from './ellipseGroup.js';
import { getQuadraticCurvePoint, getQuadraticCurveSlope } from '../lib/curve.js';
import { Theme } from '../constants/themes.js';

export class CurvedPattern {
    constructor({
        x1, y1, x2, y2, ox, oy
    }, {
        width, height
    }) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.ox = ox;
        this.oy = oy;

        let diffx = x2 - x1;
        if (diffx < 0) { 
            diffx *= -1;
        }
        let diffy = y2 - y1;
        if (diffy < 0) { 
            diffy *= -1;
        }

        this.rotation = Math.atan(diffy / diffx) / Math.PI / 2;

        const diff = Math.sqrt(diffx * diffx + diffy * diffy)

        const length = Math.floor(((diffx + diffy)) / height * 2);

        this.ellipses = [];

        for(let i = 0; i < length + 1; i++) {
            const pt = getQuadraticCurvePoint(
                this.x1,
                this.y1,
                this.ox,
                this.oy,
                this.x2,
                this.y2,
                i / (this.ellipses.length - 1),
            );

            const slope = getQuadraticCurveSlope(
                this.x1,
                this.y1,
                this.ox,
                this.oy,
                this.x2,
                this.y2,
                i / (this.ellipses.length - 1),
            )
            const alpha = Math.atan(slope.y / slope.x);
            const beta = Math.PI / 2 + alpha;

            const ellipse = new EllipseGroup(
                pt.x,
                pt.y,
                width,
                height,
                Math.tan(beta)
            );
            this.ellipses.push(ellipse);
        }
    }

    resize({
        x1, y1, x2, y2, ox, oy
    }, {
        width, height
    }) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.ox = ox;
        this.oy = oy;

        this.ellipses.forEach((ellipse, i) => {
            const pt = getQuadraticCurvePoint(
                this.x1,
                this.y1,
                this.ox,
                this.oy,
                this.x2,
                this.y2,
                i / (this.ellipses.length - 1),
            );

            const slope = getQuadraticCurveSlope(
                this.x1,
                this.y1,
                this.ox,
                this.oy,
                this.x2,
                this.y2,
                i / (this.ellipses.length - 1),
            )
            const alpha = Math.atan(slope.y / slope.x);

            ellipse.resize(
                pt.x,
                pt.y,
                width,
                height,
                alpha / Math.PI / 2
            );
        })
    }

    draw(ctx) {
        // this.drawLine(ctx);
        this.ellipses.forEach((ellipse) => {
            ellipse.draw(ctx);
        })
    }

    drawLine(ctx) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);

        ctx.quadraticCurveTo(
            this.ox, this.oy,
            this.x2, this.y2
        )

        ctx.strokeStyle = Theme.common.red;
        ctx.stroke();

        this.ellipses.forEach((ellipse, index) => {
            ctx.beginPath();
            const pt = getQuadraticCurvePoint(
                this.x1,
                this.y1,
                this.ox,
                this.oy,
                this.x2,
                this.y2,
                index / (this.ellipses.length - 1),
            );

            ctx.fillStyle = Theme.common.red;
            ctx.arc(pt.x, pt.y, 2.5, 0, 2 * Math.PI); 
            ctx.fill();

            const slope = getQuadraticCurveSlope(
                this.x1,
                this.y1,
                this.ox,
                this.oy,
                this.x2,
                this.y2,
                index / (this.ellipses.length - 1),
            )

            const alpha = Math.atan(slope.y / slope.x);
            const beta = Math.PI / 2 + alpha;

            ctx.beginPath();
            ctx.moveTo(pt.x - 20, pt.y - 20 * Math.tan(beta));
            ctx.lineTo(pt.x + 20, pt.y + 20 * Math.tan(beta));
            ctx.stroke();
        });
    }
}