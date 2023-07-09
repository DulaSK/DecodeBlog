const express = require('express')
const router = express.Router()
const passport = require('passport')
const {signUp , signIn , signOut} = require('./controller')
const createAdmin = require('../Admin/seed')


router.post('/api/signup' , signUp)
router.post('/api/signin' , passport.authenticate('local' , {failureRedirect: 'login2323'}) , signIn)
router.get('/api/signout' , signOut)

module.exports = router
