const express = require('express')
const routes = express.Router()
const {getAllCategories} = require('./controller')
const  writeDataCategory = require('./seed')
const router = require('../pages/router')

router.get('/api/category' , getAllCategories)
writeDataCategory()

module.exports = router