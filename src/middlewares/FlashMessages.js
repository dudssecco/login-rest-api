const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

exports.Messages = (req, res, next) => {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.succes_msg = req.flash('succes_msg');
    next();
};



