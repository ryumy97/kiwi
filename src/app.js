import { Circle } from './circle.js';
import { Pattern } from './pattern.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.circle = new Circle(this.stageWidth, this.stageHeight);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.circle.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.ctx.fillStyle = '#10dEe1';
        this.ctx.fillRect(0, 0, this.stageWidth, this.stageHeight);

        this.circle.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};