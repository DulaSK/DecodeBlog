const express = require('express')
const router = express.Router()
const {filterByCategory, search, pagination} = require('./setup')

router.get(filterByCategory, search, pagination)

module.exports = router