import { CircleHandler } from './kiwi/circleHandler.js';
import { ColorList } from './components/colorList.js';
import { ShareList } from './components/shareList.js';
import { LoadingOverlay } from './components/loadingOverlay.js'

class App {
    constructor() {
        //loading starts
        this.LoadingOverlay = new LoadingOverlay();
        
        //create canvas
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.circle = new CircleHandler(this.stageWidth, this.stageHeight);

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        //create options
        const container = document.createElement("div");
        container.className = 'container';
        
        this.colorList = new ColorList();
        this.colorList.appendTo(container);

        this.shareList = new ShareList();
        this.shareList.appendTo(container);

        document.body.appendChild(container);

        window.addEventListener('_selectTheme', this.selectTheme.bind(this), false);
        window.addEventListener('_drawTheme', this.drawTheme.bind(this), false);

        //prevent default
        document.addEventListener("touchmove", (e) => {e.preventDefault()}, {passive: false});

        //loading ends
        requestAnimationFrame(this.animate.bind(this));
        this.LoadingOverlay.loadingComplete();
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
        if (this.LoadingOverlay && this.LoadingOverlay.isLoading) {
            return
        }
        this.circle.update();

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.circle.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }

    selectTheme(e) {
        this.LoadingOverlay.startLoading(e.detail.selected.id);
    }

    drawTheme(e) {
        console.log('drawing Theme')
        console.log(e)
        this.circle.changeTheme(e.detail.selectedTheme);
        e.detail.completeLoading();
    }
}

window.onload = () => {
    new App();
};