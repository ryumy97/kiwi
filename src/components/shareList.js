import { facebookButton } from "./buttons/facebookButton.js";

export class ShareList {
    constructor() {
        this.listElement = document.createElement('ul');
        this.listElement.className = 'shareList';
        
        const fb = new facebookButton();

        const tw = document.createElement('li');
        tw.id = 'share-tw';
        tw.className = 'btn tw';

        const pin = document.createElement('li');
        pin.id = 'share-pin';
        pin.className = 'btn pin';

        this.listElement.append(fb.element, tw, pin);
    }

    appendTo(container) {
        container.appendChild(this.listElement);
    }
}