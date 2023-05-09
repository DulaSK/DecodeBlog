const express = require('express')
const router = express.Router()
const Category = require('../Categories/Categories')
const User = require('../auth/User')



router.get('/', async(req, res) => {
    const allCategory = await Category.find()

    // if (req.isAuthenticated()) {
    //     req.logout(function(err){
    //         if(err){return next(err)}
    //     })
    // }
    res.render('index' , {categories: allCategory, user: req.user ? req.user : {}})
})

router.get('/main/:id', async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.render('main' , {user: user , loginUser: req.user})
    }else{
        res.redirect('/not-found')
    }
    console.log(req.user._id)
    console.log(user._id)
})

router.get('/admin/:id', async(req, res) => {
    const user = await User.findById(req.params.id)
    res.render('admin' , {loginUser: req.user ? req.user : {} , user: user})
})

router.get('/user', async(req, res) => {
    const allCategory = await Category.find()
    res.render('user' , {categories: allCategory , user: req.user ? req.user : {}})
    //categ
})

router.get('/page', async(req, res) => {
    const allCategory = await Category.find()
    res.render('page' , {categories: allCategory , user: req.user ? req.user : {}})
    //catg
})

router.get('/blog', async(req, res) => {
    const allCategory = await Category.find()
    res.render('newBlog' , {categories: allCategory , user: req.user ? req.user : {}})
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