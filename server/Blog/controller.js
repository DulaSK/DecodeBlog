const Blog = require('./Blog')


const createBlog = async(req, res) => {
    if(
        req.file && req.body.title.length > 2 &&
        req.body.category.length > 2 && 
        req.body.text.length > 2
        ){
            await new Blog({
                title: req.body.title,
                category: req.body.category,
                text: req.body.text,
                image: `/IMG/${req.file.filename}`,//${req.file.destination}
                author: req.user._id
            }).save()
            res.redirect(`/main/${req.user._id}`)
        }else{
            res.redirect('/new&err&=1')
        }
}

module.exports = {createBlog}