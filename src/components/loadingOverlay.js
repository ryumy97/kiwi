export class LoadingOverlay {
    constructor() {
        this.isLoading = true;

        this.overlay = document.getElementById('overlay');

        this.overlay.addEventListener('transitionend', this.loadingTransitionEnd.bind(this), false)
    }

    loadingComplete() {
        this.overlay.classList.add('disable');

        this.isLoading = false;
    }

    loadingAnimationEnd(theme) {
        this.isLoading = true;

        const event = new CustomEvent('_drawTheme', {
            detail: {
                selectedTheme: theme,
                completeLoading: this.loadingComplete.bind(this)
            }
        });

        window.dispatchEvent(event);
    }

    loadingTransitionEnd(e) {
        this.overlay.remove();
    }

    startLoading(theme) {
        this.overlay = document.createElement('div');
        this.overlay.id = 'overlay';
        this.overlay.className = `overlay new ${theme}`;

        document.body.appendChild(this.overlay)

        this.overlay.addEventListener('animationend', this.loadingAnimationEnd.bind(this, theme), false);
        this.overlay.addEventListener('transitionend', this.loadingTransitionEnd.bind(this), false);
    }
}