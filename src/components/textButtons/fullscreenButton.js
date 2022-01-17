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

        this.element.addEventListener('mouseenter', this.mouseEnter.bind(this), false);
        this.element.addEventListener('mouseleave', this.mouseLeave.bind(this), false);

        this.element.onclick = this.openfullScreen.bind(this);

        this.element.append(this.fullscreenText, this.hoverBackground);
    }

    openfullScreen() {
        if (this.isFullscreen()) {
            if (this.cancelFullScreen()) {
                this.fullscreenText.innerText = 'fullscreen'
                this.hoverBackground.style.width = `${this.fullscreenText.clientWidth + 10}px`;

                this.element.addEventListener('mouseenter', this.mouseEnter.bind(this), false);
                this.element.addEventListener('mouseleave', this.mouseLeave.bind(this), false);

                this.element.removeEventListener('mouseenter', this.fullscreenMouseEnter.bind(this), false);
                this.element.removeEventListener('mouseleave', this.fullscreenMouseLeave.bind(this), false);
            }
        }
        else {
            if (this.requestFullScreen()) {
                this.fullscreenText.innerText = 'exit fullscreen';
                this.hoverBackground.style.width = `${this.fullscreenText.clientWidth + 10}px`;

                this.element.removeEventListener('mouseenter', this.mouseEnter.bind(this), false);
                this.element.removeEventListener('mouseleave', this.mouseLeave.bind(this), false);

                this.element.addEventListener('mouseenter', this.fullscreenMouseEnter.bind(this), false);
                this.element.addEventListener('mouseleave', this.fullscreenMouseLeave.bind(this), false);
            }
        }
    }

    isFullscreen() {
        return !(
            (document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)
        );
    }
    
    cancelFullScreen() {
        if (document.cancelFullScreen) {  
            document.cancelFullScreen();
            return true;
        } else if (document.mozCancelFullScreen) {  
            document.mozCancelFullScreen();  
            return true;
        } else if (document.webkitCancelFullScreen) {  
            document.webkitCancelFullScreen();  
            return true;
        }
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

    mouseEnter() {
        this.hoverBackground.classList.add('on');
        this.fullscreenText.classList.add('hover');
        this.hoverBackground.style.width = `${this.fullscreenText.clientWidth + 10}px`;
    }

    mouseLeave() {
        this.hoverBackground.classList.remove('on');
        this.fullscreenText.classList.remove('hover');
    }
    
    fullscreenMouseEnter() {
        this.hoverBackground.classList.remove('on');
        this.fullscreenText.classList.remove('hover');
    }
    
    fullscreenMouseLeave() {
        this.hoverBackground.classList.add('on');
        this.fullscreenText.classList.add('hover');
        this.hoverBackground.style.width = `${this.fullscreenText.clientWidth + 10}px`;
    }
} 