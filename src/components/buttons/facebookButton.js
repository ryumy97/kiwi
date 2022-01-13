export class facebookButton {
    constructor() {
        this.element = document.createElement('li');
        this.element.id = 'share-fb';
        this.element.className = 'btn fb';

        this.element.onclick = () => {
            FB.ui({
                display: 'popup',
                method: 'share',
                href: location.href
            }, (response) => {})
        }
    }
}