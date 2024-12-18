import Button from '../../components/Button/Button.js';
import Input from '../../components/Input/LoginInput.js';

import './Login.css';

export default class Login {
    constructor(container) {
        this.container = container;
        this.loginError = 0;
        this.formData = {
            username: '',
            password: ''
        }
        this.tempLoginInfo = {
            username: 'admin',
            password: 'admin1234'
        }
    }

    getErrorMessage() {
        switch(this.loginError) {
            case 0:
                return '';
            case 1:
                return '아이디, 또는 비밀번호를 입력해주세요';
            case 2:
                return '로그인 정보가 일치하지 않습니다';
            default:
                return '';
        }
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
                        ${this.loginError ? `<p class="login-error">${this.getErrorMessage()}</p>` : ''}
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
        this.formData.username = document.getElementById('username').value;
        this.formData.password = document.getElementById('password').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try { 
            if(username=='' || password=='') {
                this.loginError = 1;
                this.mount();
            }
            else if (this.handleLogin(username, password)) {
                window.router.navigate('/home');
            } else {
                this.loginError = 2;
                this.mount();
            }
        } catch (error) {
            this.loginError = 1;
            this.mount();
        }
    }


    mount() {
        this.container.innerHTML = this.render();
        if(this.formData.username) {
            document.getElementById('username').value = this.formData.username;
        }
        if(this.formData.password) {
            document.getElementById('password').value = this.formData.password;
        }

        document.getElementById('loginForm')
            .addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleLogin(username, password) {
        if(username==this.tempLoginInfo.username && password==this.tempLoginInfo.password) {
            return true;
        }
        return false;
    }
} 