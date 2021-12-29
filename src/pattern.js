import { Ellipse } from "./ellipse.js";

export class Pattern {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.curvedPattern = new CurvedPattern({
            x1: this.x + this.width / 2, y1: this.y + this.height / 4, x2: this.x + this.width * 0.3, y2: this.y + this.height * 0.7
        }, {
            width: this.width * 0.1, height: this.height * 0.2
        });
    }

    resize(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.curvedPattern.resize({
            x1: this.x + this.width / 2, y1: this.y + this.height / 4, x2: this.x + this.width * 0.3, y2: this.y + this.height * 0.7
        }, {
            width: this.width * 0.1, height: this.height * 0.2
        });
    }

    draw(ctx) {
        this.curvedPattern.draw(ctx);
    }
}

class CurvedPattern {
    constructor({
        x1, y1, x2, y2
    }, {
        width, height
    }) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        const diffx = x2 - x1;
        const diffy = y2 - y1;

        this.rotation = Math.atan(diffy / diffx) / Math.PI / 2;

        const diff = Math.sqrt(diffx * diffx + diffy * diffy)

        const length = Math.floor(diff / height * 2);

        this.ellipses = [];

        for(let i = 0; i < length + 1; i++) {
            const ellipse = new EllipseGroup(
                x1 - height * i * Math.cos(Math.PI * this.rotation * 2) / 2,
                y1 - height * i * Math.sin(Math.PI * this.rotation * 2) / 2,
                width,
                height,
                this.rotation
            );
            this.ellipses.push(ellipse);
        }
    }

    resize({
        x1, y1, x2, y2, 
    }, {
        width, height
    }) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;

        const diffx = x2 - x1;
        const diffy = y2 - y1;
        
        this.rotation = Math.atan(diffy / diffx) / Math.PI / 2;
        console.log(this.rotation)

        const diff = Math.sqrt(diffx * diffx + diffy * diffy)

        const length = Math.floor(diff / height * 2);

        this.ellipses.forEach((ellipse, i) => {
            ellipse.resize(
                x1 - height * i * Math.cos(Math.PI * this.rotation * 2) / 2,
                y1 - height * i * Math.sin(Math.PI * this.rotation * 2) / 2,
                width,
                height,
                this.rotation
            );
        })
        
        console.log(this.ellipses)
    }

    draw(ctx) {
        this.drawLine(ctx);
        this.ellipses.forEach((ellipse) => {
            ellipse.draw(ctx);
        })
    }

    drawLine(ctx) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);

        ctx.bezierCurveTo(
            this.x2, this.y2,
            this.x2, this.y2,
            this.x2, this.y2
        )

        ctx.strokeStyle = '#ff0000';
        ctx.stroke();
    }
}

class EllipseGroup {
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