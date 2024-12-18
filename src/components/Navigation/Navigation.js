import './Navigation.css';

export default class Navigation {
    constructor(title, onBackClick) {
        this.title = title;
        this.onBackClick = onBackClick;
    }

    render() {
        return `
            <nav class="navigation">
                <button class="back-button">
                    <ion-icon size="large" name="chevron-back-outline" style="cursor: pointer;"></ion-icon>
                </button>
                <h2 class="nav-title">${this.title}</h2>
            </nav>
        `;
    }

    addEvents() {
        const backButton = document.querySelector('.back-button');
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.onBackClick) {
                this.onBackClick();
            }
        });
    }
} 