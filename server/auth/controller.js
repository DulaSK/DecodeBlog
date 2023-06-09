const User = require('./User')
const bcrypt = require('bcrypt')

const signUp = async(req, res) =>{
    if(
        req.body.email.length <= 0 &&
        req.body.full_name.length <= 0 &&
        req.body.password.length <= 0 &&
        req.body.re_password.length <= 0
    ){
        res.redirect('/link?err=1')
    }else if(req.body.password.length !== req.body.re_password.length){
        res.redirect('/link?err=2')
    }else{
        const findUser = await User.findOne({ email: req.body.email}).count()
        if(findUser){
            res.redirect('/link?err=3')
        }else{
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    new User({
                        email: req.body.email,
                        full_name: req.body.full_name,
                        password: hash,
                        isAdmin: false,
                    }).save()
                    res.redirect('/sign')
                });
            })
        }
    }
}

const signIn = (req, res) => {
    if(req.user.isAdmin){
        res.redirect(`/admin/${req.user.id}`)
    }else{
        res.redirect(`/main/${req.user.id}`)
    }
}

const signOut = (req, res) => {
    req.logout(function(err){
        if(err){return next(err)}
    })
    res.redirect('/')
}

module.exports = {signUp , signIn , signOut}
