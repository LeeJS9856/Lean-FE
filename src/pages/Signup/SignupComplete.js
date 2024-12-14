import Navigation from '../../components/Navigation/Navigation.js';
import Input from '../../components/Input/SignupInput.js';
import Button from '../../components/Button/Button.js';
import './Signup.css';

export default class SignupComplete {
    constructor(container) {
        this.container = container;
    }
    
    render() {
        this.navigation = new Navigation('회원가입');
        const idInput = new Input('text', 'ID', '아이디', "아이디 입력");
        const passwordInput = new Input('password', 'password', '비밀번호', "비밀번호는 8자이상, 특수문자 1개 이상");
        const passwordConfirmInput = new Input('password', 'password-confirm', '비밀번호 확인', "비밀번호 확인");
        const signupButton = new Button('회원가입', 'button', 'signup-button');

        return `
            ${this.navigation.render()}
            <div class="signup-container">
                <div class="info-container">
                    <p class="info-text">마지막으로</p>
                    <p class="info-text">회원가입을 진행해볼까요?</p>
                </div>
                <form id="signupForm" class="signup-form" novalidate>
                    ${idInput.render()}
                    ${passwordInput.render()}
                    ${passwordConfirmInput.render()}
                    ${signupButton.render()}
                </form>
            </div>
        `;
    }

    mount() {
        this.container.innerHTML = this.render();
        this.navigation.addEvents();

        const idInput = document.getElementById('ID');
        const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('password-confirm');
        const signupButton = document.querySelector('.signup-button');

        //버튼 비활성화시 색 바뀌는 이벤트
        signupButton.classList.add('disabled');
        const checkInputs = () => {
            if (idInput.value && passwordInput.value && passwordConfirmInput.value) {
                signupButton.classList.remove('disabled');
            } else {
                signupButton.classList.add('disabled');
            }
        };
        idInput.addEventListener('input', checkInputs);
        passwordInput.addEventListener('input', checkInputs);
        passwordConfirmInput.addEventListener('input', checkInputs);
    }
} 