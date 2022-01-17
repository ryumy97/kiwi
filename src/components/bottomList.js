import { AboutButton } from "./textButtons/aboutButton.js";
import { fullscreenButton } from "./textButtons/fullscreenButton.js";

export class BottomList {
    constructor() {
        this.listElement = document.createElement('ul');
        this.listElement.className = 'bottomList';

        const about = new AboutButton();

        const fullscreen = new fullscreenButton();
        
        this.listElement.append(about.element, fullscreen.element);
    }

    appendTo(container) {
        container.appendChild(this.listElement);
    }
}