export class twitterButton {
    constructor() {
        this.element = document.createElement('li');
        this.element.id = 'share-tw';
        this.element.className = 'btn tw';

        

        this.element.onclick = () => {
            const description = 'Kiwi - a mini project by Ryumy97'
            const url = `https://kiwi.ryumy.com/${window.location.hash}`
            window.open(`https://twitter.com/intent/tweet?text=${description}&url=${url}`, '_blank', 'location=yes,height=570,width=520')
        };
    }
}