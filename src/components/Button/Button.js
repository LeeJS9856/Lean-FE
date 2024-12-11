import './Button.css';

export default class Button {
    constructor(text, type = 'button', className = '') {
        this.text = text;
        this.type = type;
        this.className = className;
    }

    render() {
        return `
            <button type="${this.type}" class="button ${this.className}">
                <span style="cursor: pointer;">${this.text}</span>
            </button>
        `;
    }
} 