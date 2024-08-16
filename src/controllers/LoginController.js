const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.index = async (req, res) => {
    return res.render('login.html')
}

exports.auth = async (req, res) => {
    const {email, password} = req.body;
    const errors = []

    // Validadations
    if(!email){
        errors.push('O campo e-mail é obrigatório!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/login') 
        })
        return 
        // return res.status(422).json({msg: "O campo e-mail é obrigatório!"})
    }
    if(!password){
        errors.push('O campo password é obrigatório!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/login') 
        })
        return 
        // return res.status(422).json({msg: "O campo password é obrigatório!"})
    }

    // Check if user exist
    const user = await User.findOne({email: email})
    if(!user){
        errors.push('Usuário ou senha inválidos!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/login') 
        })
        return 
        // return res.status(422).json({msg: "Usuário ou senha inválido!"})
    }

    // Check if password match
    const checkPassword = await bcrypt.compare(password, user.password)
    if(!checkPassword){
        errors.push('Usuário ou senha inválidos!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/login') 
        })
        return 
        // return res.status(422).json({msg: "Usuário ou senha inválido!"})
    }

    // Try Login
    try{
        const secret = process.env.SECRET;
        const token = jwt.sign({
            userId: user._id
        }, secret, { expiresIn: '1h' })
        // res.status(200).json({ token })
        console.log(token)
        const cookie = res.cookie('token', token, { httpOnly: true, maxAge: 3600000 })
        res.redirect('/dashboard')
    } catch(err){
        console.log(err)
        errors.push('Aconteceu um erro em nosso servidor, por favor tente novamente mais tarde!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/login') 
        })
        return 
        // res.status(500).json({msg: "Aconteceu um erro em nosso servidor, por favor tente novamente mais tarde!"})
    }
}

