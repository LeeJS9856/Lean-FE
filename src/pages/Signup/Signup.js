import Navigation from '../../components/Navigation/Navigation.js';
import Input from '../../components/Input/SignupInput.js';
import Button from '../../components/Button/Button.js';
import Dropdown from '../../components/Dropdown/SignupDropdown.js';
import './Signup.css';

export default class Signup {
    constructor(container) {
        this.container = container;
        this.currentStep = 1;
        this.signupData = {};
        this.handleBackClick = () => {
            if (this.currentStep > 1) {
                this.currentStep--;
                this.mount();
            }
            else {
                window.history.back();
            }
        };
    }

    render() {
        return `
            <div class="signup-container">
                ${this.renderCurrentStep()}
            </div>
        `;
    }

    renderCurrentStep() {
        switch(this.currentStep) {
            case 1:
                return this.renderProfileStep();
            case 2:
                return this.renderAcademicStep();
            case 3:
                return this.renderIDStep();
            case 4:
                return this.renderCompleteStep();
            default:
                return '';
        }
    }

    renderProfileStep() {
        this.navigation = new Navigation('학사인증', this.handleBackClick);
        const usernameInput = new Input('text', 'username', '이름', "이름 입력");
        const phoneInput = new Input('tel', 'phone', '휴대폰번호', "띄어쓰기나 -를 제외하고 입력");
        const signupButton = new Button('다음', 'button', 'signup-button');

        return `
            ${this.navigation.render()}
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
        `;
    }

    renderAcademicStep() {
        this.navigation = new Navigation('학사인증', this.handleBackClick);
        const collegeDropdown = new Dropdown('단과대학', ['공과대학', '인문대학', '사회대학', "AI융합대학", "교육대학"]);
        const departmentInput = new Input('text', 'department', '학과', "학과 입력");
        const studentNumberInput = new Input('number', 'student-number', '학번', "Ex) 201576");
        const signupButton = new Button('다음', 'button', 'signup-button');

        return `
            ${this.navigation.render()}
            <div class="info-container">
                <p class="info-text">추후 인증을 위해</p>
                <div class="info-container-flex">
                    <p class="info-text-green">학사정보</p>
                    <p class="info-text">가 필요해요</p>
                </div>
            </div>
            <form id="signupForm" class="signup-form" novalidate>
                ${collegeDropdown.render()}
                ${departmentInput.render()}
                ${studentNumberInput.render()}
                ${signupButton.render()}
            </form>
        `;
    }

    renderIDStep() {
        this.navigation = new Navigation('회원가입', this.handleBackClick);
        const idInput = new Input('text', 'ID', '아이디', "아이디 입력");
        const passwordInput = new Input('password', 'password', '비밀번호', "비밀번호는 8자이상, 특수문자 1개 이상");
        const passwordConfirmInput = new Input('password', 'password-confirm', '비밀번호 확인', "비밀번호 확인");
        const signupButton = new Button('회원가입', 'button', 'signup-button');

        return `
            ${this.navigation.render()}
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
        `;
    }

    renderCompleteStep() {
        const signupButton = new Button('로그인하러 가기', 'button', 'signup-button', '/login');

        return `
            <div class="complete-container">
                <ion-icon class="checkmark-circle-outline" name="checkmark-circle-outline"></ion-icon>
                <p class="info-text">회원가입 완료</p>
                <p class="info-text-gray">회원가입이 성공적으로 완료되었어요</p>
                ${signupButton.render()}
            </div>
        `;
    }

    mount() {
        this.container.innerHTML = this.render();
        this.addEvents();
    }

    addEvents() {        
        switch(this.currentStep) {
            case 1:
                this.handleProfileStep();
                break;
            case 2:
                this.handleAcademicStep();
                break;
            case 3:
                this.handleIDStep();
                break;
            case 4:
                break;
        }
    }

    handleProfileStep() {
        const usernameInput = document.getElementById('username');
        const phoneInput = document.getElementById('phone');
        const signupButton = document.querySelector('.signup-button');

        this.navigation.addEvents();
        signupButton.classList.add('disabled');

        // 이전 데이터 입력
        if(this.signupData.username && this.signupData.phone) {
            usernameInput.value = this.signupData.username;
            phoneInput.value = this.signupData.phone;
            signupButton.classList.remove('disabled');
        }

        // 버튼 활성화 조건
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
                this.signupData = {
                    ...this.signupData,
                    username: usernameInput.value,
                    phone: phoneInput.value
                };
                this.currentStep++;
                this.mount();
            }
        });
    }

    handleAcademicStep() {
        const collegeDropdown = document.querySelector('.dropdown .selected');
        const departmentInput = document.getElementById('department');
        const studentNumberInput = document.getElementById('student-number');
        const signupButton = document.querySelector('.signup-button');

        this.navigation.addEvents();
        signupButton.classList.add('disabled');

        // 이전 데이터 입력
        if(this.signupData.college && this.signupData.department && this.signupData.studentNumber) {
            collegeDropdown.innerText = this.signupData.college;
            departmentInput.value = this.signupData.department;
            studentNumberInput.value = this.signupData.studentNumber;
            signupButton.classList.remove('disabled');
        }

        // 버튼 활성화 조건
        const checkInputs = () => {
            if (departmentInput.value && studentNumberInput.value && collegeDropdown.innerText !== '단과대학 선택') {
                signupButton.classList.remove('disabled');
            } else {
                signupButton.classList.add('disabled');
            }
        };

        this.handleDropdown(checkInputs);
        departmentInput.addEventListener('input', checkInputs);
        studentNumberInput.addEventListener('input', checkInputs);

        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (departmentInput.value && studentNumberInput.value && collegeDropdown.innerText !== '단과대학 선택') {
                this.signupData = {
                    ...this.signupData,
                    college: collegeDropdown.innerText,
                    department: departmentInput.value,
                    studentNumber: studentNumberInput.value
                };
                this.currentStep++;
                this.mount();
            }
        });
    }

    handleIDStep() {
        const idInput = document.getElementById('ID');
        const passwordInput = document.getElementById('password');
        const passwordConfirmInput = document.getElementById('password-confirm');
        const signupButton = document.querySelector('.signup-button');

        this.navigation.addEvents();
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

        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (idInput.value && passwordInput.value && passwordConfirmInput.value) {
                this.signupData = {
                    ...this.signupData,
                    id: idInput.value,
                    password: passwordInput.value,
                    passwordConfirm: passwordConfirmInput.value
                };
                this.currentStep++;
                this.mount();
            }
        });
    }

    handleDropdown(checkInputs) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const select = dropdown.querySelector('.select');
            const menu = dropdown.querySelector('.menu');
            const caret = dropdown.querySelector('.caret');
            const options = dropdown.querySelectorAll('.menu li');
            const selected = dropdown.querySelector('.selected');

            select.addEventListener('click', () => {
                select.classList.toggle('select-clicked');
                caret.classList.toggle('caret-rotate');
                menu.classList.toggle('menu-open');
            });

            options.forEach(option => {
                option.addEventListener('click', () => {
                    selected.innerText = option.innerText;
                    select.classList.remove('select-clicked');
                    caret.classList.remove('caret-rotate');
                    menu.classList.remove('menu-open');
                    checkInputs();
                    options.forEach(option => {
                        option.classList.remove('active');
                    });
                    option.classList.add('active');
                });
            });
        });
    }
} 