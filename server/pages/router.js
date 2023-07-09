    const express = require('express')
    const router = express.Router()
    const Category = require('../Categories/Categories')
    const User = require('../auth/User')
    const Blog = require('../Blog/Blog')
    const setUp = require('../SetUp/router')
    const Comment = require('../Comments/Commnts')


    const filterByCategory = async (req, res) => {
        const options= {}
        const category = await Category.findOne({key: req.query.categ})
    
        if(category){
            options.category = category._id
            res.locals.category = req.query.categ
        }
    
        return options   
    }
    
    const search = (req, res, options) => {
        if(req.query.search && req.query.search.length > 0){
            options.$or = [
                {
                    title: new RegExp(req.query.search , 'i')
                },
                {
                    text: new RegExp(req.query.search , 'i')
                }
            ]
            res.locals.search = req.query.search
        }
    }
    
    const pagination = (req) => {
        let page = 0
        const limit = 2 
        if(req.query.page && req.query.page > 0){
            page = req.query.page
        }
    
        return {page, limit}
    }

    
    router.get('/', async(req, res) => {
        // const options= {}
        // const category = await Category.findOne({key: req.query.categ})
        // if(category){
        //     options.category = category._id
        //     res.locals.category = req.query.categ
        // }
    
        // let page = 0
        // const limit = 2 
        // if(req.query.page && req.query.page > 0){
        //     page = req.query.page
        // }
        
        // if(req.query.search && req.query.search.length > 0){
        //     options.$or = [
        //         {
        //             title: new RegExp(req.query.search , 'i')
        //         },
        //         {
        //             text: new RegExp(req.query.search , 'i')
        //         }
        //     ]
        //     res.locals.search = req.query.search
        // }

        
        const options = await filterByCategory(req, res) 
        console.log(`==========================`)
        console.log(options)
        const {page, limit} = pagination(req)
        search(req, res, options)

        const totalBlogs = await Blog.count(options)

        const allCategory = await Category.find()
        const blogs = await Blog.find(options).limit(limit).skip(page*limit).populate('category').populate('author')
        res.render('index' , {categories: allCategory, user: req.user ? req.user : {} , blogs , pages: Math.ceil(totalBlogs/limit)})
    })


    //==================================================================

    router.get('/main/:id', async(req, res) => {
        options = {}
        console.log(`=======================`)
        search(req, res, options)
        console.log(options)
        const {page, limit} = pagination(req)
        
        const totalBlogs = await Blog.count({author: req.user._id})

        const user = await User.findById(req.params.id)
        const blogs = await Blog.find({author: req.user._id}).limit(limit).skip(page*limit).populate('category')
        if(user){
            res.render('main' , {user: user , loginUser: req.user , blogs, pages: Math.ceil(totalBlogs/limit)})
        }else{
            res.redirect('/not-found')
        }
    })

    //================================================================


    router.get('/blog', async(req, res) => {
        const allCategory = await Category.find()
        res.render('newBlog' , {categories: allCategory , user: req.user ? req.user : {}, })
        //categ
    })


    //=================================================================


    router.get('/detailsBlog/:id', async(req, res) => {
        const comments = await Comment.find({blogId: req.params.id}).populate('authorId')
        console.log(comments)
        const allCategory = await Category.find()
        const blog = await Blog.findById(req.params.id).populate('category')
        res.render('detailsBlog' , {categories: allCategory , user: req.user ? req.user : {}, blog, comments})
        //catg
    })


    //=================================================================


    router.get('/editBlog/:id', async(req, res) => {
        const allCategory = await Category.find()
        const blog = await Blog.findById(req.params.id).populate('category')
        res.render('editBlog' , {categories: allCategory , user: req.user ? req.user : {}, blog})
        //catg
    })

    //===============================================================

    router.get('/sign', (req, res) => {
        res.render('sign' ,  {user: req.user ? req.user : {}})
    })

    //================================================================================

    router.get('/link', (req, res) => {
        res.render('link' ,  {user: req.user ? req.user : {}})
    })

    //=====================================================================


    router.get('not-found' , (req, res) => {
        res.render('notFound')
    })

    module.exports= router  