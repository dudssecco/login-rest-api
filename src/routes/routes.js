require('dotenv').config();
const express = require('express');
const route =  express.Router();

const IndexController = require('../controllers/IndexController')
const LoginController = require('../controllers/LoginController')
const ForgetController = require('../controllers/ForgetController.js')
const ResetController = require('../controllers/ResetController.js')
const RegisterController = require('../controllers/RegisterController')
const DashboardController = require('../controllers/DashboardController')

const AuthToken = require('../middlewares/AuthToken.js')

module.exports = route

route.get('/', IndexController.index)

route.get('/login', LoginController.index)
route.post('/auth/login', LoginController.auth)

route.get('/forget', ForgetController.index)
route.post('/auth/forget', ForgetController.auth)

route.get('/reset/:token', ResetController.index)
route.post('/auth/reset/:token', ResetController.auth)

route.get('/register', RegisterController.index)
route.post('/auth/register', RegisterController.auth)

route.get('/dashboard', AuthToken, DashboardController.index)
route.post('/auth/reserve', AuthToken, DashboardController.reserve)
