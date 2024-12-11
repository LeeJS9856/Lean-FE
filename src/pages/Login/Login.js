import Button from '../../components/Button/Button.js';
import Input from '../../components/Input/Input.js';

import './Login.css';

export default class Login {
    constructor(container) {
        this.container = container;
    }

    render() {
        const usernameInput = new Input('text', 'username', '아이디를 입력해주세요', true);
        const passwordInput = new Input('password', 'password', '비밀번호를 입력해주세요', true);
        const loginButton = new Button('로그인', 'submit', 'login-button');

        return `
            <div class="login-container">
                <span id="service-name">전남대학교 물품 대여 서비스</span>
                <span id="lean-name">LEAN</span>
                <form id="loginForm" class="login-form">
                    ${usernameInput.render()}
                    ${passwordInput.render()}
                    ${loginButton.render()}
                </form>
                <div class="signup-link">
                    <span>아직 회원이 아니신가요?</span>
                    <a href="/signup" id="signupLink">회원가입</a>
                </div>
            </div>
        `;
    }

    handleSubmit(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // 로그인 로직 구현
        // 성공시 홈 페이지로 이동
        if (this.loginSuccess) {
            window.router.navigate('/home');
        }
    }

    mount() {
        this.container.innerHTML = this.render();
        document.getElementById('loginForm')
            .addEventListener('submit', this.handleSubmit.bind(this));
        
        // 회원가입 링크 클릭 이벤트 추가
        document.getElementById('signupLink')
            .addEventListener('click', (e) => {
                e.preventDefault();
                window.router.navigate('/signup');
            });
    }
} 