import Login from '../pages/Login/Login.js';
import SignupProfile from '../pages/Signup/SignupProfile.js';

export default class Router {
    constructor(container) {
        this.container = container;
        this.routes = {
            '/': Login,
            '/login': Login,
            '/signup/profile': SignupProfile
        };

        window.addEventListener('popstate', () => this.handleRoute());
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        const Component = this.routes[path] || this.routes['/'];
        const component = new Component(this.container);
        component.mount();
    }

    navigate(path) {
        window.history.pushState({}, '', path);
        this.handleRoute();
    }
}