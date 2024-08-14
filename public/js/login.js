const eye = document.querySelector('#login-eye');
const inputPassword = document.querySelector('#password');

eye.addEventListener('click', () => {
    if(inputPassword.type === 'password'){
        inputPassword.type = 'text'
    } else{
        inputPassword.type = 'password'
    }
})