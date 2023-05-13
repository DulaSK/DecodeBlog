const express = require('express')
const router = express.Router()
const {upload} = require('./multer') 
const {createBlog , editBlog} = require('./controller')
const {isAuth} = require('../auth/middlewares')



router.post('/api/new/blog', isAuth , upload.single('image'), createBlog )
router.post('/api/edit/blog', isAuth , upload.single('image'), editBlog )
module.exports = router