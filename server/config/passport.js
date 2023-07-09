// const passport = require('passport')
// const User = require('../auth/User')
// const bcrypt = require('bcrypt')
// const LocalStrategy = require('passport-local')

// passport.use(new LocalStrategy(
//     {
//         usernameFiled: 'email'
//     },
//     function(email , password , done) {
//         User.findOne({email}).then(user => {
//             bcrypt.compare(password, user.password , function(err, result) {
//                 if(err){return done(err)}
//                 if(result){return done(null, user)}
//             })
//         }).catch(err => {
//             return done(err)
//         })
//     }
// ))

// passport.serializeUser(function(user, done) {
//     console.log(user)
//     done(null, user._id)
// })

// passport.deserializeUser(function(id, done) {
//     console.log(id)
//     User.findById(id).then((user , err) =>{
//         done(err , user)
//     })
// })

const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email , password , done) {
        User.findOne({email}).then(user =>{
            if(user.password){
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err ){return done(err)}
                    if(result){return done(null, user)}
                });
            }else{
                return done('Пользователь не найден')
            }
        }).catch(err =>{
            return done(err)
        })
    }
))

passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id).then((user , err) =>{
        done(err , user)
    })
})