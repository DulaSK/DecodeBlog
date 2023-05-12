const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogShema = new mongoose.Schema({
    title: String,
    category: {type: Schema.Types.ObjectId, ref: 'category'},
    image: String,
    text: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}
})

module.exports = mongoose.model('blog' , BlogShema)