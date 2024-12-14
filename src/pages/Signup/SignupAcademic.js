import Navigation from '../../components/Navigation/Navigation.js';
import Input from '../../components/Input/SignupInput.js';
import Button from '../../components/Button/Button.js';
import Dropdown from '../../components/Dropdown/SignupDropdown.js';
import './Signup.css';

export default class SignupAcademic {
    constructor(container) {
        this.container = container;
    }

    render() {
        this.navigation = new Navigation('학사인증');
        const collegeDropdown = new Dropdown('단과대학', ['공과대학', '인문대학', '사회대학', "AI융합대학", "교육대학"]);
        const departmentInput = new Input('text', 'department', '학과', "학과 입력");
        const studentNumberInput = new Input('number', 'student-number', '학번', "Ex) 201576");
        const signupButton = new Button('다음', 'button', 'signup-button');

        return `
            ${this.navigation.render()}
            <div class="signup-container">
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
            </div>
        `;
    }

    mount() {
        this.container.innerHTML = this.render();
        this.navigation.addEvents();

        //버튼 비활성화시 색 바뀌는 이벤트
        const collegeDropdown = document.querySelector('.dropdown .selected');
        const departmentInput = document.getElementById('department');
        const studentNumberInput = document.getElementById('student-number');
        const signupButton = document.querySelector('.signup-button');
        signupButton.classList.add('disabled');
        const checkInputs = () => {
            if (departmentInput.value && studentNumberInput.value && collegeDropdown.innerText !== '단과대학 선택') {
                signupButton.classList.remove('disabled');
            } else {
                signupButton.classList.add('disabled');
            }
        };
        departmentInput.addEventListener('input', checkInputs);
        studentNumberInput.addEventListener('input', checkInputs);

        //드롭다운 이벤트
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

        //버튼 클릭시 회원가입 페이지로 이동
        signupButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (departmentInput.value && studentNumberInput.value && collegeDropdown.innerText !== '단과대학 선택') {
                window.router.navigate('/signup/complete', { 
                    state: { 
                        college : collegeDropdown.innerText,
                        department : departmentInput.value,
                        studentNumber : studentNumberInput.value
                    }
                });
            }
        });
    }
}