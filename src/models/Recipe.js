const mongoose = require('mongoose');

const Recipe = mongoose.model('Recipe', {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = Recipe;