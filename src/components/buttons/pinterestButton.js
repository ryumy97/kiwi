export class PinterestButton {
    constructor() {
        this.element = document.createElement('li');
        this.element.id = 'share-pin';
        this.element.className = 'btn pin';
        
        this.element.onclick = () => {
            PinUtils.pinOne({
                url: `https://kiwi.ryumy.com/${window.location.hash}`,
                media: "https://kiwi.ryumy.com/assets/share1x1.png",
                description: "Kiwi - Ryumy\nMini project by In Ha Ryu"
            })
        }
    }
}