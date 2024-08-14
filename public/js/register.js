const eye = document.querySelector('#login-eye-password')
const eyeConfirm = document.querySelector('#login-eye-confirmpassword')
const inputPassword = document.querySelector('#password')
const inputConfirmPassword = document.querySelector('#confirmpassword')

eye.addEventListener('click', () =>{
    if(inputPassword.type === 'password'){
        inputPassword.type = 'text'
    } else{
        inputPassword.type = 'password'
    }
})

eyeConfirm.addEventListener('click', () =>{
    if(inputConfirmPassword.type === 'password'){
        inputConfirmPassword.type = 'text'
    } else{
        inputConfirmPassword.type = 'password'
    }
})