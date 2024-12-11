import './Input.css';

export default class Input {
    constructor(type, id, placeholder, required = false) {
        this.type = type;
        this.id = id;
        this.placeholder = placeholder;
        this.required = required;
    }

    render() {
        return `
            <div class="form-group">
                <input 
                    type="${this.type}"
                    id="${this.id}"
                    placeholder="${this.placeholder}"
                    ${this.required ? 'required' : ''}
                    class="input-field"
                >
            </div>
        `;
    }
} 