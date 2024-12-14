import Button from '../../components/Button/Button.js';
import Input from '../../components/Input/LoginInput.js';

import './Login.css';

export default class Login {
    constructor(container) {
        this.container = container;
        this.loginError = false;
    }

    render() {
        const usernameInput = new Input('text', 'username', '아이디를 입력해주세요', true);
        const passwordInput = new Input('password', 'password', '비밀번호를 입력해주세요', true);
        const loginButton = new Button('로그인', 'submit', 'login-button');

        return `
            <div class="login-container">
                <span id="service-name">전남대학교 물품 대여 서비스</span>
                <a href="/login" id="lean-name">LEAN</a>
                <form id="loginForm" class="login-form" novalidate>
                    ${usernameInput.render()}
                    ${passwordInput.render()}
                    <div class="error-message-container">
                        ${this.loginError ? '<p class="login-error">로그인에 실패하였습니다</p>' : ''}
                    </div>
                    ${loginButton.render()}
                </form>
                <div class="signup-link">
                    <span>아직 회원이 아니신가요?</span>
                    <a href="/signup" id="signupLink">회원가입</a>
                </div>
            </div>
        `;
    }

    async handleSubmit(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const loginSuccess = false;
            
            if (loginSuccess) {
                window.router.navigate('/home');
            } else {
                this.loginError = true;
                this.mount();
            }
        } catch (error) {
            this.loginError = true;
            this.mount();
        }
    }

    mount() {
        this.container.innerHTML = this.render();
        document.getElementById('loginForm')
            .addEventListener('submit', this.handleSubmit.bind(this));
        
        document.getElementById('signupLink')
            .addEventListener('click', (e) => {
                e.preventDefault();
                window.router.navigate('/signup/profile');
            });
    }
} 