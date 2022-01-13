export class ShareList {
    constructor() {
        this.listElement = document.createElement('ul');
        this.listElement.className = 'shareList';
        
        const fb = document.createElement('li');
        fb.id = 'share-fb';
        fb.className = 'btn fb';

        const tw = document.createElement('li');
        tw.id = 'share-tw';
        tw.className = 'btn tw';

        const pin = document.createElement('li');
        pin.id = 'share-pin';
        pin.className = 'btn pin';

        this.listElement.append(fb, tw, pin);
    }

    appendTo(container) {
        container.appendChild(this.listElement);
    }
}