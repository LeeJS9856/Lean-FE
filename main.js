import './src/styles/style.css'
import Router from './src/utils/router.js'

document.addEventListener('DOMContentLoaded', () => {
    const app = document.querySelector('#app');
    window.router = new Router(app);
});