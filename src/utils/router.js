import Login from '../pages/Login/Login.js';
import Signup from '../pages/Signup/Signup.js';

export default class Router {
    constructor(container) {
        this.container = container;
        this.routes = {
            '/': Login,
            '/login': Login,
            '/signup': Signup
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