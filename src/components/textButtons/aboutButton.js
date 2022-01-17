export class AboutButton {
    constructor() {
        this.overlayRendering = false;

        this.element = document.createElement('li');
        this.element.id = 'about';
        this.element.className = 'primary';

        const aboutText = document.createElement('div');
        aboutText.className = 'text'
        aboutText.innerText = 'about this project';

        aboutText.addEventListener('pointerenter', this.mouseEnter.bind(this, aboutText), false);
        aboutText.addEventListener('pointerleave', this.mouseLeave.bind(this, aboutText), false);

        this.isOverlayOn = window.location.hash.includes('/about');
        this.overlayRendering = this.isOverlayOn;

        this.element.onclick = this.dispatchAboutOverlayEvent.bind(this);

        window.addEventListener('_about_addFinish', this.finishRendering.bind(this), false)
        window.addEventListener('_about_removeFinish', this.finishRendering.bind(this), false)

        this.element.appendChild(aboutText);
    }

    finishRendering() {
        this.overlayRendering = false;
    }

    dispatchAboutOverlayEvent() {
        if (this.overlayRendering) {
            return
        }

        const event = new CustomEvent('_about', {
            detail: {
                turnOverlayOn: !this.isOverlayOn
            }
        });
        
        this.overlayRendering = true;
        window.dispatchEvent(event);
        
        if (!this.isOverlayOn) {
            location.replace(`${window.location.hash !== '' ? window.location.hash : '#'}/about`);
        }
        else {
            const href = window.location.href;
            const replacement = href.replace('/about', '');

            location.replace(replacement);
        }

        this.isOverlayOn = !this.isOverlayOn;
    }

    mouseEnter(aboutText) {
        aboutText.classList.add('hover');
        
    }

    mouseLeave(aboutText) {
        aboutText.classList.remove('hover');
    }
}