import { Theme } from "../constants/themes.js";
import { Spike } from "./spike.js";

export class Pattern {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.n = 20;
        const angle = 2 * Math.PI / this.n;

        this.spikes = [];
        for (let a = 0; a < 2 * Math.PI; a += angle) {
            const spike = new Spike(this.x, this.y, this.radius, a, angle);
            
            this.spikes.push(spike);
        }

        this.smallSpikes = [];
        for (let a = 0; a < 2 * Math.PI; a += angle) {
            const spike = new Spike(this.x, this.y, this.radius * 0.8, a, angle);
            this.smallSpikes.push(spike);
        }
        
        const seedAngle1 = 2 * Math.PI / this.n / 2;
        this.seeds1 = [];
        for (let a = seedAngle1 / 8; a < 2 * Math.PI; a += seedAngle1) {
            const seed = new Seed(this.x, this.y, this.radius * 0.5, a, seedAngle1);
            this.seeds1.push(seed);
        }

        const seedAngle2 = 2 * Math.PI / this.n;
        this.seeds2 = [];
        for (let a = seedAngle2 / 8; a < 2 * Math.PI; a += seedAngle2) {
            const seed = new Seed(this.x, this.y, this.radius * 0.4, a, seedAngle2);
            this.seeds2.push(seed);
        }
        
    }

    resize(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.spikes.forEach((item, index) => {
            const angle = 2 * Math.PI / this.n;
            const a = angle * index

            item.resize(this.x, this.y, this.radius, a, angle)
        })

        this.smallSpikes.forEach((item, index) => {
            const angle = 2 * Math.PI / this.n;
            const a = angle * index + angle / 2;

            item.resize(this.x, this.y, this.radius * 0.8, a, angle)
        })
        
        this.seeds1.forEach((item, index) => {
            const angle = 2 * Math.PI / this.n / 2;
            const a = angle * index + angle / 4;
            
            item.resize(this.x, this.y, this.radius * 0.5, a, angle);
        })
        
        this.seeds2.forEach((item, index) => {
            const angle = 2 * Math.PI / this.n;
            const a = angle * index + angle / 4;

            item.resize(this.x, this.y, this.radius * 0.4, a, angle);
        })
    }

    draw(ctx) {
        this.drawSpike(ctx);
        // this.drawGuide(ctx);
        this.drawSeeds(ctx);
    }

    drawGuide(ctx) {
        this.seeds1.forEach((item) => {
            ctx.beginPath();
            ctx.moveTo(item.x + 1, item.y);
            ctx.arc(item.x, item.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = Theme.common.red;
            ctx.fill();
        })
        
        this.seeds2.forEach((item) => {
            ctx.beginPath();
            ctx.moveTo(item.x + 1, item.y);
            ctx.arc(item.x, item.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = Theme.common.red;
            ctx.fill();
        })
    }

    drawSeeds(ctx) {
        this.seeds1.forEach((item) => {
            item.draw(ctx);
        })

        this.seeds2.forEach((item) => {
            item.draw(ctx);
        })
    }

    drawSpike(ctx) {
        this.spikes.forEach((item) => {
            item.draw(ctx);
        })

        this.smallSpikes.forEach((item) => {
            item.draw(ctx);
        })
    }
}

class Seed {
    constructor(x, y, radius, angle, angleWidth) {
        this.radiusOffset = Math.random() * 0.2,
        this.angleOffset = angleWidth * Math.random() * 0.6

        this.x = x + radius * (1 + this.radiusOffset) * Math.cos(angle + this.angleOffset);
        this.y = y + radius * (1 + this.radiusOffset) * Math.sin(angle + this.angleOffset);

        this.width = radius * 0.03;
    }

    resize(x, y, radius, angle) {
        this.x = x + radius * (1 + this.radiusOffset) * Math.cos(angle + this.angleOffset);
        this.y = y + radius * (1 + this.radiusOffset) * Math.sin(angle + this.angleOffset);

        this.width = radius * 0.03;
    } 

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.fillStyle = Theme.common.black;
        ctx.fill();
    }
}