import { facebookButton } from "./buttons/facebookButton.js";
import { twitterButton } from "./buttons/twitterButton.js";

export class ShareList {
    constructor() {
        this.listElement = document.createElement('ul');
        this.listElement.className = 'shareList';
        
        const fb = new facebookButton();

        const tw = new twitterButton();

        const pin = document.createElement('li');
        pin.id = 'share-pin';
        pin.className = 'btn pin';
        pin.onclick = () => {
            PinUtils.pinOne({
                url: `https://kiwi.ryumy.com/${window.location.hash}`,
                media: "https://kiwi.ryumy.com/assets/share1x1.png",
                description: "Kiwi - Ryumy\nMini project by In Ha Ryu"
            })
        }

        this.listElement.append(fb.element, tw.element, pin);
    }

    appendTo(container) {
        container.appendChild(this.listElement);
    }
}