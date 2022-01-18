import { CircleHandler } from './kiwi/circleHandler.js';
import { ColorList } from './components/colorList.js';
import { ShareList } from './components/shareList.js';
import { BottomList } from './components/bottomList.js';
import { LoadingOverlay } from './components/loadingOverlay.js';
import { AboutOverlay } from './components/aboutOverlay.js';

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

        this.themeName = window.location.hash &&
            window.location.hash.includes('#bird')
            ? 'bird'
            : window.location.hash.includes('#fruit')
            ? 'fruit'
            : 'bird';

        this.circle = new CircleHandler(this.stageWidth, this.stageHeight, this.themeName);

        this.isOverlayOn = window.location.hash.includes('/about');
        if (this.isOverlayOn) {
            this.circle.pause();
            this.aboutOverlay = new AboutOverlay(this.stageWidth, this.stageHeight, this.themeName);
        }

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        //create options
        const container = document.createElement("div");
        container.id = 'container';
        container.className = 'container';
        
        this.colorList = new ColorList(this.isOverlayOn);
        this.colorList.appendTo(container);

        this.shareList = new ShareList();
        this.shareList.appendTo(container);

        this.bottomList = new BottomList();
        this.bottomList.appendTo(container);

        this.aboutOverlay && this.aboutOverlay.appendTo(container);

        document.body.appendChild(container);

        window.addEventListener('_selectTheme', this.selectTheme.bind(this), false);
        window.addEventListener('_drawTheme', this.drawTheme.bind(this), false);
        window.addEventListener('_about', this.toggleAboutOverlay.bind(this), false);

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
        this.aboutOverlay && this.aboutOverlay.resize(this.stageWidth, this.stageHeight);
    }

    animate(t) {
        if (this.LoadingOverlay && this.LoadingOverlay.isLoading) {
            return
        }

        this.circle.update();

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.circle.draw(this.ctx);

        if (this.aboutOverlay) {
            try {
                this.aboutOverlay.update();
                this.aboutOverlay.draw(this.ctx);
            }
            catch {
                null
            }
        }

        requestAnimationFrame(this.animate.bind(this));
    }

    selectTheme(e) {
        this.LoadingOverlay.startLoading(e.detail.selected.id);
    }

    drawTheme(e) {
        this.circle.changeTheme(e.detail.selectedTheme);
        e.detail.completeLoading();
    }

    toggleAboutOverlay(e) {
        const { turnOverlayOn } = e.detail;
        
        this.isOverlayOn = turnOverlayOn;

        if (turnOverlayOn) {
            this.circle.pause();
    
            this.themeName = window.location.hash &&
                window.location.hash.includes('#bird')
                ? 'bird'
                : window.location.hash.includes('#fruit')
                ? 'fruit'
                : 'bird';
    
            this.aboutOverlay = new AboutOverlay(this.stageWidth, this.stageHeight, this.themeName);
            const container = document.getElementById('container');
            this.aboutOverlay.appendTo(container);
    
            this.colorList.disable();
            
        }
        else {
            this.aboutOverlay.remove();

            window.addEventListener('_about_removeFinish', this.didRemoveAboutOverlay.bind(this), false);
        }
    }

    didRemoveAboutOverlay() {
        this.aboutOverlay = null;
        this.colorList.enable();
        this.circle.resume();
    }
}

window.onload = () => {
    new App();
};