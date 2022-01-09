import { CurvedPattern } from './curvedPattern.js';

export class Pattern {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        const patternWidth = this.width * 0.1;
        const patternHeight = this.height * 0.2;

        this.curvedPatterns = [];
        
        for(let i = 0; i < 6; i++) {
            const pattern = new CurvedPattern({
                x1: this.x + this.width * 0.4275 + this.width * 0.08 * i, 
                y1: this.y + this.height * 0.25,
                x2: this.x + this.width * 0.3 + this.width * 0.04 * i, 
                y2: this.y + this.height * 0.5 + this.height * 0.1 * i,
                ox: this.x + this.width * 0.4275 + this.width * 0.1 * i,
                oy: this.y + this.height * 0.4275 + this.height * 0.05 * i
            }, {
                width: patternWidth, height: patternHeight
            });

            this.curvedPatterns.push(pattern);
        }
    }

    resize(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        const patternWidth = this.width * 0.1;
        const patternHeight = this.height * 0.2;

        this.curvedPatterns.forEach((pattern, i) => {
            pattern.resize({
                x1: this.x + this.width * 0.4275 + this.width * 0.08 * i, 
                y1: this.y + this.height * 0.25,
                x2: this.x + this.width * 0.3 + this.width * 0.04 * i, 
                y2: this.y + this.height * 0.5 + this.height * 0.1 * i,
                ox: this.x + this.width * 0.4275 + this.width * 0.1 * i,
                oy: this.y + this.height * 0.4275 + this.height * 0.05 * i
            }, {
                width: patternWidth, height: patternHeight
            });
        })
    }

    draw(ctx) {
        this.curvedPatterns.forEach((pattern) => {
            pattern.draw(ctx);
        })
    }
}
