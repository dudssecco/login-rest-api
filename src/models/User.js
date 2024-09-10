const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: { type: String, required: true },
    lastname: { type: String, require: true },
    password: { type: String, required: true },
    email: { type: String, require: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
})

module.exports = User