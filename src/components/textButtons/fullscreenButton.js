export class fullscreenButton {
    constructor() {
        this.element = document.createElement('li');
        this.element.id = 'fullscreen';
        this.element.className = 'secondary';

        this.fullscreenText = document.createElement('div');
        this.fullscreenText.innerText = 'fullscreen';
        this.fullscreenText.className = 'text'
        
        this.hoverBackground = document.createElement('div')
        this.hoverBackground.className = 'background';

        this.element.addEventListener('pointerenter', this.mouseEnter.bind(this), false);
        this.element.addEventListener('pointerleave', this.mouseLeave.bind(this), false);
        
        document.addEventListener('fullscreenchange', this.fullscreenChange.bind(this), false);
        document.addEventListener('mozfullscreenchange', this.fullscreenChange.bind(this), false);
        document.addEventListener('MSFullscreenChange', this.fullscreenChange.bind(this), false);
        document.addEventListener('webkitfullscreenchange', this.fullscreenChange.bind(this), false);

        this.element.onclick = this.openfullScreen.bind(this);

        this.element.append(this.fullscreenText, this.hoverBackground);
    }

    openfullScreen() {
        if (this.isFullscreen()) {
            this.cancelFullScreen();
        }
        else {
            this.requestFullScreen();
        }
    }

    isFullscreen() {
        return !(
            (document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)
        );
    }
    
    cancelFullScreen() {
        if (document.exitFullscreen) {  
            document.exitFullscreen();
            return true;
        } else if (document.mozCancelFullScreen) {  
            document.mozCancelFullScreen();  
            return true;
        } else if (document.webkitExitFullscreen) {  
            document.webkitExitFullscreen();  
            return true;
        }
        window.scrollTo(0, 0);

        const resizeEvent = new Event('resize');
        window.dispatchEvent(resizeEvent);
    }

    requestFullScreen() {
        if (document.documentElement.requestFullScreen) {  
            document.documentElement.requestFullScreen();
            return true;
        } else if (document.documentElement.mozRequestFullScreen) {  
            document.documentElement.mozRequestFullScreen();
            return true;
        } else if (document.documentElement.webkitRequestFullScreen) {  
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            return true;
        }
        else {
            return false
        }
    }

    fullscreenChange(e) {
        if (this.isFullscreen()) {
            this.fullscreenText.innerText = 'exit fullscreen';
            this.hoverBackground.style.width = `${this.fullscreenText.clientWidth + 10}px`;

            this.hoverBackground.classList.add('on');
            this.fullscreenText.classList.add('hover');
        }
        else {
            this.fullscreenText.innerText = 'fullscreen'
            this.hoverBackground.style.width = `${this.fullscreenText.clientWidth + 10}px`;

            this.hoverBackground.classList.remove('on');
            this.fullscreenText.classList.remove('hover');
        }
    }

    mouseEnter() {
        if (this.isFullscreen()) {
            this.hoverBackground.classList.remove('on');
            this.fullscreenText.classList.remove('hover');
        }
        else {
            this.hoverBackground.classList.add('on');
            this.fullscreenText.classList.add('hover');
        }
        this.hoverBackground.style.width = `${this.fullscreenText.clientWidth + 10}px`;
    }

    mouseLeave() {
        if (this.isFullscreen()) {
            this.hoverBackground.classList.add('on');
            this.fullscreenText.classList.add('hover');
        }
        else {
            this.hoverBackground.classList.remove('on');
            this.fullscreenText.classList.remove('hover');
        }
        this.hoverBackground.style.width = `${this.fullscreenText.clientWidth + 10}px`;
    }
} 