require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

function authToken(req, res, next) {
    const token = req.cookies.token
    // if (!token) return res.status(401).send('Access Denied');
    console.log(token)
    if(!token) return res.render('erro404.html')

    try {
        const verified = jwt.verify(token, secret);
        req.userId = verified;
        next();
    } catch (error) {
        res.clearCookie('token')
        res.render('erro404.html')
    }
}

module.exports = authToken;