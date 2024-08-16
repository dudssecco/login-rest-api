const Recipe = require('../models/Recipe')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.index = async (req, res) => {
    res.render('dashboard.html')
}

exports.add = async (req, res) => {
    const { title, description, ingredients } = req.body
    const errors = []

    if(!title){
        errors.push('Preencha o título da sua receita!');
        req.flash('error_msg', errors);
        req.session.save(() => {
            return res.redirect('/dashboard') 
         })
         return 
    }

    if(!description){
        errors.push('Preencha a descricao da sua receita!');
        req.flash('error_msg', errors);
        req.session.save(() => {
            return res.redirect('/dashboard') 
         })
         return 
    }

    if(!ingredients){
        errors.push('Preencha os ingredientes da sua receita!');
        req.flash('error_msg', errors);
        req.session.save(() => {
            return res.redirect('/dashboard') 
         })
         return 
    }

    const secret = process.env.SECRET;
    const token = req.cookies.token 
    const verified = jwt.verify(token, secret);
    const userId = verified.userId;

    try{
        const recipe = new Recipe({ title, description, ingredients, userId: userId })
        await recipe.save()
        res.status(201).json({msg: "Receita criada com sucesso"})
    } catch(err){
        res.status(400).json({msg: "Erro ao criar a receita."});
        console.log(err)
    }
}