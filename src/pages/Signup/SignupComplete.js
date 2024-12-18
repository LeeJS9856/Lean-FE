import Navigation from '../../components/Navigation/Navigation.js';
import Input from '../../components/Input/SignupInput.js';
import Button from '../../components/Button/Button.js';
import './Signup.css';

export default class SignupComplete {
    constructor(container) {
        this.container = container;
    }
    
    render() {
        const idInput = new Input('text', 'ID', '아이디', "아이디 입력");
        const passwordInput = new Input('password', 'password', '비밀번호', "비밀번호는 8자이상, 특수문자 1개 이상");
        const passwordConfirmInput = new Input('password', 'password-confirm', '비밀번호 확인', "비밀번호 확인");
        const signupButton = new Button('로그인하러 가기', 'button', 'signup-button', '/login');

        return `
            <div class="signup-container">
                <div class="complete-container">
                    <ion-icon class="checkmark-circle-outline" name="checkmark-circle-outline"></ion-icon>
                    <p class="info-text">회원가입 완료</p>
                    <p class="info-text-gray">회원가입이 성공적으로 완료되었어요</p>
                </div>
                ${signupButton.render()}
            </div>
        `;
    }

    mount() {
        this.container.innerHTML = this.render();

        const idInput = document.getElementById('ID');
        const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('password-confirm');
        const signupButton = document.querySelector('.signup-button');

    }
} 