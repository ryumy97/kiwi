export class ColorList {
    constructor(disabled = false) {
        this.list = [];

        this.listElement = document.createElement('ul');
        this.listElement.className = 'colorList';

        this.hash = window.location.hash
            ? window.location.hash
            : '#bird'

        const bird = document.createElement('li');
        bird.id = 'bird';
        bird.className = 'btn bird';
        this.hash.includes('#bird') ? bird.classList.add('selected') : null;
        bird.append(
            document.createElement('div'),
            document.createElement('div'),
            document.createElement('div')
        )

        this.list.push(bird);

        const fruit = document.createElement('li');
        fruit.id = 'fruit';
        fruit.className = 'btn fruit';
        this.hash.includes('#fruit') ? fruit.classList.add('selected') : null;
        fruit.append(
            document.createElement('div'),
            document.createElement('div')
        )

        this.list.push(fruit);

        this.selected = this.hash.includes('#bird') 
            ? bird 
            : this.hash.includes('#fruit')
            ? fruit
            : bird;

        this.listElement.append(...this.list);

        !disabled && this.list.forEach((item) => {
            item.addEventListener('mouseenter', this.mouseEnterListener.bind(this), false);
            item.addEventListener('mousedown', this.mouseClickListener.bind(this, item), false);
            item.addEventListener('mouseleave', this.mouseLeaveListener.bind(this), false);
        })

        this.disabled = disabled;
        disabled && this.listElement.classList.add('disabled');
    }

    appendTo(container) {
        container.appendChild(this.listElement);
    }

    disable() {
        this.disabled = true;
        this.listElement.classList.add('disabled');
        this.list.forEach((item) => {
            item.removeEventListener('mouseenter', this.mouseEnterListener.bind(this), false);
            item.removeEventListener('mousedown', this.mouseClickListener.bind(this, item), false);
            item.removeEventListener('mouseleave', this.mouseLeaveListener.bind(this), false);
        })
    }

    enable () {
        this.disabled = false;
        this.listElement.classList.remove('disabled');

        this.list.forEach((item) => {
            item.addEventListener('mouseenter', this.mouseEnterListener.bind(this), false);
            item.addEventListener('mousedown', this.mouseClickListener.bind(this, item), false);
            item.addEventListener('mouseleave', this.mouseLeaveListener.bind(this), false);
        })
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
            
            location.replace(`#${e.id}`);
        }
        this.selected = e;
    }
}