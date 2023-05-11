const Blog = require('./Blog')


const createBlog = (req, res) => {
    if(
        req.file && req.body.title.length > 2 &&
        req.body.category.length > 2 && 
        req.body.blog.length > 2
        ){
            new Blog({
                title: req.body.title,
                category: req.body.category,
                blog: req.body.blog,
                image: `${req.file.destination}/${req.file.filename}`,
                author: req.user._id
            }).save()
            res.redirect(`/main/${req.user._id}`)
        }else{
            res.redirect('/new&err&=1')
        }
}

module.exports = {createBlog}