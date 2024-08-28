const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.index = async (req, res) => {
    return res.render('register.html')
}

exports.auth = async (req, res) => {
    const {name, lastname, email, password, confirmpassword} = req.body;
    const errors = [];
    const succes = []

    // Validations
    if(!name){
        errors.push('O campo name é obrigatório!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // return res.status(422).json({msg: "O campo name é obrigatório!"})
    }
    if(!lastname){
        errors.push('O campo lastname é obrigatório!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // return res.status(422).json({msg: "O campo name é obrigatório!"})
    }
    if(!email){
        errors.push('O campo e-mail é obrigatório!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // return res.status(422).json({msg: "O campo e-mail é obrigatório!"})
    }
    if(!password){
        errors.push('O campo password é obrigatório!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // return res.status(422).json({msg: "O campo password é obrigatório!"})
    }
    if(password !== confirmpassword){
        errors.push('As senhas devem ser iguais!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // return res.status(422).json({msg: "As senhas devem ser iguais!"})
    }

    // Validation Password (8char, 1number, 1max)
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(!regex.test(password)){
        errors.push('A senha deve conter no mínimo 8 caracteres com números e letras maiuscúlas!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // return res.status(422).json({msg: "O campo password deve conter 8 caracteres, 1 letra maiuscula e 1 número!"})
    }

    // Check if user exist
    const userExists = await User.findOne({email: email})
    if(userExists){
        errors.push('Por favor utilize outro e-mail!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // return res.status(422).json({msg: "Por favor utilize outro e-mail!"})
    }

    // Create Password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt)

    // Create User
    const user = new User({
        name: name,
        lastname: lastname,
        email: email,
        password: passwordHash
    })

    try{
        await user.save()
        succes.push('Usuário criado com sucesso!')
        req.flash('succes_msg', succes)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // res.status(201).json({msg: "Usuário criado com sucesso!"})
    } catch(err){
        console.log(err)
        errors.push('Aconteceu um erro em nosso servidor, por favor tente novamente mais tarde!')
        req.flash('error_msg', errors)
        req.session.save(() => {
           return res.redirect('/register') 
        })
        return 
        // res.status(500).json({msg: "Aconteceu um erro em nosso servidor, por favor tente novamente mais tarde!"})
    }
}

