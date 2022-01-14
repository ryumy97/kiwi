import { facebookButton } from "./buttons/facebookButton.js";
import { PinterestButton } from "./buttons/pinterestButton.js";
import { twitterButton } from "./buttons/twitterButton.js";

export class ShareList {
    constructor() {
        this.listElement = document.createElement('ul');
        this.listElement.className = 'shareList';
        
        const fb = new facebookButton();

        const tw = new twitterButton();

        const pin = new PinterestButton();

        this.listElement.append(fb.element, tw.element, pin.element);
    }

    appendTo(container) {
        container.appendChild(this.listElement);
    }
}