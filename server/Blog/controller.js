const Blog = require('./Blog')
const fs = require('fs')
const path = require('path')

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

const editBlog = async(req, res) => {
    if(
        req.file && req.body.title.length > 2 && 
        req.body.category.length > 2 && 
        req.body.text.length > 2 
    ){
        const blog = await Blog.findById(req.body.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
        // blog.title = req.body.title
        // blog.category = req.body.category
        // blog.text = req.body.text
        // blog.image = `/IMG/${req.file.filename}`
        // blog.author = reg.user._id
        // blog.save()
        await Blog.findByIdAndUpdate(req.body.id , {
            title: req.body.title,
            category: req.body.category,
            text: req.body.text,
            image: `/IMG/${req.file.filename}`,//${req.file.destination}
            author: req.user._id
        })
        res.redirect('/main/' + req.user._id)
    }else{
        res.redirect(`/editBlog/${req.body.id}?error=1`)
    }
}

// const deleteBlog = async(req, res) => {
//     const blog = await Blog.findById(req.params.id)
//     if(blog){
//         fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
//         await Blog.deleteOne({_id: req.params.id})
//         res.status(200).send('ok')  
//     }else{
//         res.status(404).send('Not found')
//     }
// }

const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if(blog){
     fs.unlinkSync(path.join(__dirname + '../../../public' + blog.image))
     await Blog.deleteOne({_id:req.params.id})
     res.status(200).send('ok')
    }else{
         res.status(404).send('Not found')
    } 
 }

module.exports = {createBlog , editBlog, deleteBlog}