const User = require('../models/User')
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.index = async (req, res) => {
    res.render('forget.html')
}

exports.auth = async (req, res) => {
    const { email } = req.body
    const errors = []
    const succes = []

    // Validations
    if(!email){
        errors.push('Preencha o campo email')
        req.flash('error_msg', errors)
        req.session.save(() => {
            return res.redirect('/forget')
        })
        return
    }

    // Check if the email is registered
    const user = await User.findOne({email: email})
    if(!user){
        errors.push('Usuário nao encontrado!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/forget') 
        })
        return 
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = Date.now() + 3600000
    await user.save()

    // Send email with password reset link
    const Cookify = process.env.EMAIL
    const CookifyPass = process.env.EMAIL_PASS
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: Cookify,
            pass: CookifyPass,
        }
    })

    const resetLink = `http://localhost:3000/reset/${resetToken}`
    await transporter.sendMail({
        to: user.email,
        subject: 'Redefinir Senha',
        text: `Clique no link para redefinir sua senha: ${resetLink}`
    }) 


    succes.push('Se existir um usuário com este e-mail, enviaremos um link de redefinicao de senha!')
        req.flash('succes_msg', succes)
        req.session.save(() => {
            return res.redirect('/forget')
    })
    // res.send('E-mail de redefinição de senha enviado')
}