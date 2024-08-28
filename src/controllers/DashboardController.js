const Recipe = require('../models/Recipe')
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.index = async (req, res) => {
    res.render('dashboard.html')
}

exports.reserve = async (req, res) => {
    res.status(200)
}