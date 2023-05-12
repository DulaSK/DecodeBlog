const express = require('express')
const router = express.Router()
const Category = require('../Categories/Categories')
const User = require('../auth/User')
const Blog = require('../Blog/Blog')



router.get('/', async(req, res) => {
    const allCategory = await Category.find()
    const blogs = await Blog.find()
    res.render('index' , {categories: allCategory, user: req.user ? req.user : {} , blogs})
})

router.get('/main/:id', async(req, res) => {
    const user = await User.findById(req.params.id)
    const blogs = await Blog.find()
    console.log('-----------------------')
    console.log(req.body)
    if(user){
        res.render('main' , {user: user , loginUser: req.user , blogs})
    }else{
        res.redirect('/not-found')
    }
})

// router.get('/admin/:id', async(req, res) => {
//     const user = await User.findById(req.params.id)
//     res.render('admin' , {loginUser: req.user ? req.user : {} , user: user})
// })

router.get('/detailsBlog/:id', async(req, res) => {
    const allCategory = await Category.find()
    const blog = await Blog.findById(req.params.id)
    res.render('detailsBlog' , {categories: allCategory , user: req.user ? req.user : {}, blog})
    //catg
})

router.get('/blog', async(req, res) => {
    const allCategory = await Category.find()
    res.render('newBlog' , {categories: allCategory , user: req.user ? req.user : {}, })
    //categ
})

router.get('/sign', (req, res) => {
    res.render('sign' ,  {user: req.user ? req.user : {}})
})

router.get('/link', (req, res) => {
    res.render('link' ,  {user: req.user ? req.user : {}})
})

router.get('not-found' , (req, res) => {
    res.render('notFound')
})

module.exports= router  