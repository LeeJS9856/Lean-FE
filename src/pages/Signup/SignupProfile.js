import Navigation from '../../components/Navigation/Navigation.js';
import Input from '../../components/Input/SignupInput.js';
import Button from '../../components/Button/Button.js';
import './Signup.css';

export default class SignupProfile {
    constructor(container) {
        this.container = container;
    }
    
    render() {
        this.navigation = new Navigation('학사인증');
        const usernameInput = new Input('text', 'username', '이름', "이름 입력");
        const phoneInput = new Input('tel', 'phone', '휴대폰번호', "띄어쓰기나 -를 제외하고 입력");
        const signupButton = new Button('다음', 'button', 'signup-button');

        return `
            ${this.navigation.render()}
            <div class="signup-container">
                <div class="info-container">
                    <p class="info-text">서비스를 위해</p>
                    <div class="info-container-flex">
                        <p class="info-text-green">기본정보</p>
                        <p class="info-text">가 필요해요</p>
                    </div>
                </div>
                <form id="signupForm" class="signup-form" novalidate>
                    ${usernameInput.render()}
                    ${phoneInput.render()}
                    ${signupButton.render()}
                </form>
            </div>
        `;
    }

    mount() {
        this.container.innerHTML = this.render();
        this.navigation.addEvents();

        const usernameInput = document.getElementById('username');
        const phoneInput = document.getElementById('phone');
        const signupButton = document.querySelector('.signup-button');

        //버튼 비활성화시 색 바뀌는 이벤트
        signupButton.classList.add('disabled');
        const checkInputs = () => {
            if (usernameInput.value && phoneInput.value) {
                signupButton.classList.remove('disabled');
            } else {
                signupButton.classList.add('disabled');
            }
        };
        usernameInput.addEventListener('input', checkInputs);
        phoneInput.addEventListener('input', checkInputs);

        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (usernameInput.value && phoneInput.value) {
                window.router.navigate('/signup/academic', { 
                    state: { 
                        username: usernameInput.value,
                        phone: phoneInput.value 
                    }
                });
            }
        });
    }
} 