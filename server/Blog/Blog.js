const mongoose = require('mongoose');

const BlogShema = new mongoose.Schema({
    title: String,
    category: {type: Schema.types.ObjectId, ref: 'Category'},
    image: String,
    blog: String,
})

module.exports = mongoose.model('category' , BlogShema)