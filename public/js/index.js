const btnLogin = document.querySelector('.btn_login');
const btnRegister = document.querySelector('.btn_register');

btnLogin.addEventListener('click', () => {
    window.location.href = '/login'
})

btnRegister.addEventListener('click', () => {
    window.location.href = '/register'
})