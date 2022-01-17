export class AboutButton {
    constructor() {
        this.element = document.createElement('li');
        this.element.id = 'about';
        this.element.className = 'primary';

        const aboutText = document.createElement('div');
        aboutText.className = 'text'
        aboutText.innerText = 'about this project';

        this.isOverlayOn = window.location.hash.includes('/about');

        this.element.onclick = this.dispatchAboutOverlayEvent.bind(this)

        this.element.appendChild(aboutText);
    }

    dispatchAboutOverlayEvent() {
        const event = new CustomEvent('_about', {
            detail: {
                turnOverlayOn: !this.isOverlayOn
            }
        });

        window.dispatchEvent(event);
        
        if (!this.isOverlayOn) {
            console.log(window.location.hash)
            location.replace(`${window.location.hash !== '' ? window.location.hash : '#'}/about`);
        }
        else {
            console.log('replacement')
            const href = window.location.href;
            const replacement = href.replace('/about', '');

            location.replace(replacement)
        }

        this.isOverlayOn = !this.isOverlayOn;
    }
}