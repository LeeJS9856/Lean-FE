import './SignupInput.css';

export default class SignupInput {
    constructor(type, id, label, placeholder = '') {
        this.type = type;
        this.id = id;
        this.label = label;
        this.placeholder = placeholder;
    }

    render() {
        return `
            <div class="signup-input-group">
                <label for="${this.id}" class="signup-label">${this.label}</label>
                <input 
                    type="${this.type}"
                    id="${this.id}"
                    class="signup-input-field"
                    placeholder="${this.placeholder}"
                >
            </div>
        `;
    }
}