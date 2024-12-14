import './SignupDropdown.css';

export default class SignupDropdown {
    constructor(label, list = [], className = '', placeholder = '') {
        this.label = label;
        this.list = list;
        this.className = className;
        this.placeholder = placeholder;
    }

    render() {
        return `
            <div class="signup-dropdown-group">
                <label class="signup-label">${this.label}</label>
                <div class="dropdown">
                    <div class="select">
                        <span class="selected">단과대학 선택</span>
                        <div class="caret"></div>
                    </div>
                    <ul class="menu">
                        ${this.list.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
} 