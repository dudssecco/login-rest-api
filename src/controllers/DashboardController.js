const Recipe = require('../models/Recipe')

exports.index = async (req, res) => {
    res.render('dashboard.html')
}

exports.auth = async (req, res) => {
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
}