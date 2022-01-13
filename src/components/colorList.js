export class ColorList {
    constructor() {
        this.list = [];

        this.listElement = document.createElement('ul');
        this.listElement.className = 'colorList';

        const bird = document.createElement('li');
        bird.id = 'bird';
        bird.className = 'btn bird selected';
        bird.append(
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        )

        this.list.push(bird);

        const fruit = document.createElement('li');
        fruit.id = 'fruit';
        fruit.className = 'btn fruit';
        fruit.append(
            document.createElement('div'),
            document.createElement('div')
        )

        this.list.push(fruit);

        this.selected = bird;

        this.listElement.append(...this.list);

        this.list.forEach((item) => {
            item.addEventListener('mouseenter', this.mouseEnterListener.bind(this), false);
            item.addEventListener('mousedown', this.mouseClickListener.bind(this, item), false);
            item.addEventListener('mouseleave', this.mouseLeaveListener.bind(this), false);
        })
    }

    appendTo(container) {
        container.appendChild(this.listElement);
    }

    mouseEnterListener(e) {
        if (this.selected.id !== e.target.id) {
            this.selected.classList.remove('selected')
            this.selected.style.opacity = 0.4;
        }
    }

    mouseLeaveListener(e) {
        if (this.selected.id !== e.target.id) {
            this.selected.classList.add('selected')
            this.selected.style.opacity = 1;
        }
        else {
            this.list.filter((item) => {
                return item.id !== this.selected.id
            }).forEach((item) => {
                item.classList.remove('selected')
                item.style.opacity = 1;
            })
        }
    }

    mouseClickListener(e) {
        e.classList.add('selected');
        if (this.selected.id !== e.id) {
            const event = new CustomEvent('_selectTheme', {
                detail: {
                    selected: e
                }
            });

            window.dispatchEvent(event);
            window.location.href = `#${e.id}`;
        }
        this.selected = e;
    }
}