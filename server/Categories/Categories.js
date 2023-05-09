const mongoose = require('mongoose');

const CategoryShema = new mongoose.Schema({
    name: String,
    key: Number
})

module.exports = mongoose.model('category' , CategoryShema)