export class AboutButton {
    constructor() {
        this.overlayRendering = false;

        this.element = document.createElement('li');
        this.element.id = 'about';
        this.element.className = 'primary';

        const aboutText = document.createElement('div');
        aboutText.className = 'text'
        aboutText.innerText = 'about this project';

        this.isOverlayOn = window.location.hash.includes('/about');
        this.overlayRendering = this.isOverlayOn;

        this.element.onclick = this.dispatchAboutOverlayEvent.bind(this);

        window.addEventListener('_about_addFinish', this.finishRendering.bind(this), false)
        window.addEventListener('_about_removeFinish', this.finishRendering.bind(this), false)

        this.element.appendChild(aboutText);
    }

    finishRendering() {
        this.overlayRendering = false;
        console.log('yes');
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
            console.log(window.location.hash)
            location.replace(`${window.location.hash !== '' ? window.location.hash : '#'}/about`);
        }
        else {
            console.log('replacement')
            const href = window.location.href;
            const replacement = href.replace('/about', '');

            location.replace(replacement);
        }

        this.isOverlayOn = !this.isOverlayOn;
    }
}