import { Ellipse } from './ellipse.js';

export class EllipseGroup {
    constructor(x, y, width, height, rotation) {
        this.ellipses = [
            new Ellipse(x, y, width * 0.5, height * 0.5, rotation),
            new Ellipse(x, y, width * 0.75, height * 0.75, rotation),
            new Ellipse(x, y, width, height, rotation)
        ]
    }

    resize(x, y, width, height, rotation) {
        this.ellipses.forEach((ellipse, index) => {
            const multiple = index === 0 ? 0.5 : index === 1 ? 0.75 : 1;
            ellipse.resize(x, y, width * multiple, height * multiple, rotation);
        })
    }

    draw(ctx) {
        ctx.lineWidth = this.width * 0.004
        
        ctx.globalCompositeOperation = 'destination-over';
        this.ellipses.forEach((ellipse) => {
            ellipse.draw(ctx);
        })
    }
}