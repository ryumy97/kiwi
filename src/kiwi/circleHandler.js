import { Circle } from "./circle.js";
import { Theme } from "../constants/themes.js";

export class CircleHandler {
    constructor(stageWidth, stageHeight, themeName) {
        this.themeName = themeName;
        
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        const radius = stageHeight > stageWidth ? stageWidth / 4 : stageHeight / 4;

        const x = - radius;
        const y = this.stageHeight * 0.8 - radius;

        this.openingProgress = 0;
        this.speed = (1 - this.openingProgress) / 20;
        
        this.vx = this.stageWidth * 0.0175;
        this.ax = 0;
        this.vy = this.stageHeight * 0.01;
        this.ay = this.stageHeight * 0.005;

        console.log(this.vx)

        this.angularV = 0;

        this.circle = new Circle(x, y, radius, Math.PI * 1.1, this.themeName);

        this.isSelected = false;
        this.originalMousePos = null;
        this.mousePos = null;

        document.addEventListener('pointerdown', this.onDown.bind(this), false)
        document.addEventListener('pointermove', this.onMove.bind(this), false)
        document.addEventListener('pointerup', this.onUp.bind(this), false)
    }

    resize(stageWidth, stageHeight) {
        const xRatio = this.circle.x / this.stageWidth;
        const yRatio = this.circle.y / this.stageHeight;

        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        const radius = stageHeight > stageWidth ? stageWidth / 4 : stageHeight / 4;

        this.circle.resize(xRatio * this.stageWidth, yRatio * this.stageHeight + this.circle.radius - radius, radius);
    }

    changeTheme(theme) {
        this.themeName = theme;

        const radius = this.stageHeight > this.stageWidth ? this.stageWidth / 4 : this.stageHeight / 4;

        const x = - radius;
        const y = this.stageHeight * 0.8 - radius;

        this.openingProgress = 0;
        this.speed = (1 - this.openingProgress) / 20;
        
        this.vx = this.stageWidth * 0.0175;
        this.ax = 0;
        this.vy = this.stageHeight * 0.01;
        this.ay = this.stageHeight * 0.002;

        this.angularV = 0;

        this.circle = new Circle(x, y, radius, Math.PI * 1.1, this.themeName);
    }

    pause() {
        this.paused = true;
        this.then = false;
    }

    resume() {
        this.paused = false;
    }

    update() {
        console.log(this.vx);
        this.now = Date.now();
        const elapsed = this.then ? this.now - this.then : 1000/60;
        const interval = 1000 / 60

        const ratio = elapsed / interval;

        if (this.paused) {
            return;
        }

        if (this.mousePos && this.isSelected) {
            const xdiff = this.mousePos.x - this.circle.x - this.difference.x;
            const ydiff = this.mousePos.y - this.circle.y - this.difference.y;

            this.vx = xdiff * 0.2 * ratio;
            this.ax = 0;
            this.vy = ydiff * 0.2 * ratio;
            this.ay = 0;
            this.angularV *= 0.95 * ratio;
        }
        this.updateX(ratio);
        this.updateY(ratio);

        this.then = Date.now();
    }

    updateY(ratio) {
        this.vy *= 1 - 0.01 * ratio;
        this.vy += this.ay * ratio;
        this.circle.move(this.circle.x, this.circle.y + this.vy);

        if (this.circle.y > this.stageHeight * 0.8 - this.circle.radius) {
            this.circle.move(this.circle.x, this.stageHeight * 0.8 - this.circle.radius)
            this.vy *= -0.75;
        }
    }

    updateX(ratio) {
        this.vx += this.ax * ratio;
        this.ax = 0;

        if (this.circle.y >= this.stageHeight * 0.8 - this.circle.radius) {
            this.vx *= 1 - 0.05 * ratio;
            this.angularV = this.vx / this.circle.radius;
        }
        else {        
            this.vx *= 1 - 0.025 * ratio;
        }
        
        this.circle.move(this.circle.x + this.vx, this.circle.y)

        if (this.circle.x + this.circle.radius > this.stageWidth && this.vx > 0) {
            this.circle.move(this.stageWidth - this.circle.radius, this.circle.y);
            this.vx *= -1;
        }

        if (this.circle.x - this.circle.radius < 0 && this.vx < 0) {
            this.circle.move(this.circle.radius, this.circle.y);
            this.vx *= -1;
        }

        this.circle.rotate(this.circle.rotation + this.angularV);
    }

    draw(ctx) {
        this.circle.draw(ctx);

        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = Theme[this.themeName].backgroundColor;
        ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

        ctx.globalCompositeOperation = 'source-over';

        const grd = ctx.createLinearGradient(0, this.stageHeight * 0.8, 0, this.stageHeight);
        grd.addColorStop(0, Theme[this.themeName].stageDarkColor);
        grd.addColorStop(1, Theme[this.themeName].stageLightColor);
        ctx.fillStyle = grd;
        ctx.fillRect(0, this.stageHeight * 0.8, this.stageWidth, this.stageHeight / 3);  
        
        if (this.isSelected) {
            // this.drawMousePosition(ctx);
        }
    }

    drawMousePosition(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.mousePos.x - 5, this.mousePos.y);
        ctx.arc(this.mousePos.x, this.mousePos.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        
        ctx.beginPath();
        ctx.moveTo(this.circle.x + this.difference.x - 5, this.circle.y + this.difference.y);
        ctx.arc(this.circle.x + this.difference.x, this.circle.y + this.difference.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();

    }

    onDown(e) {
        if (this.paused) {
            document.body.style.cursor = 'default';
            return
        }

        this.mousePos = {
            x: e.clientX,
            y: e.clientY
        }

        this.difference = {
            x: e.clientX - this.circle.x,
            y: e.clientY - this.circle.y
        };

        this.isSelected = this.isMouseInCircle(this.mousePos)
        if (this.isSelected) {
            document.body.style.cursor = 'grabbing'
        }
    }

    isMouseInCircle({x, y}) {
        const xDistance = x - this.circle.x;
        const yDistance = y - this.circle.y;

        const diff = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
        
        return diff <= this.circle.radius;
    }

    onMove(e) {
        if (this.paused) {
            document.body.style.cursor = 'default';
            return
        }

        if (this.isSelected) {
            this.mousePos = {
                x: e.clientX,
                y: e.clientY
            }
        }
        else {
            if (this.isMouseInCircle({
                x: e.clientX,
                y: e.clientY
            })) {
                document.body.style.cursor = 'grab'
            }
            else {
                document.body.style.cursor = 'default'
            }
        }
    }

    onUp(e) {
        if (this.paused) {
            document.body.style.cursor = 'default';
            return
        }

        this.mousePos = null;
        this.originalMousePos = null;
        this.isSelected = false;

        this.vx *= 1.5;
        this.vy *= 1.5;

        this.ax = 0;
        this.ay = this.stageHeight * 0.005;
    }
}