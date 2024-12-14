import './Button.css';

export default class Button {
    constructor(text, type = 'button', className = '', link='') {
        this.text = text;
        this.type = type;
        this.className = className;
        this.link = link;
    }

    render() {
        if (this.link) {
            return `
                <a href="${this.link}" class="button ${this.className}">
                    <span style="cursor: pointer;">${this.text}</span>
                </a>
            `;
        }

        return `
            <button type="${this.type}" class="button ${this.className}">
                <span style="cursor: pointer;">${this.text}</span>
            </button>
        `;
    }
} 