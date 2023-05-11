const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BlogShema = new mongoose.Schema({
    title: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    image: String,
    blog: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('blog' , BlogShema)