const User = require('../models/User')
const bcrypt = require('bcrypt')
require('dotenv').config();

exports.index = async (req, res) => {
    const { token } = req.params
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if(!user) return res.status(400).send('Token inválido ou expirado');

    res.render('resetPassword.html', {token});
}

exports.auth = async (req, res) => {
    const { token }  = req.params
    const { password, confirmpassword } = req.body
    const errors = []

    // Validations
    if(!password){
        errors.push('O campo password é obrigatório!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect(`/reset/${token}`)
        })
        return 
    }
    if(password !== confirmpassword){
        errors.push('As senhas devem ser iguais!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect(`/reset/${token}`) 
        })
        return 
    }

    // Validation Password (8char, 1number, 1max)
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(!regex.test(password)){
        errors.push('A senha deve conter no mínimo 8 caracteres com números e letras maiuscúlas!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect(`/reset/${token}`) 
        })
        return 
    }

    // Check if user exist
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })

    if(!user) return res.status(400).send('Token inválido ou expirado');

    // Create Password and Reset Token
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    res.send('Senha redefinida com sucesso');
}