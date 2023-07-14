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

           //726608901011-b43o4gnhrbkiie8if68o0ekeqm274k1p.apps.googleusercontent.com
//Client ID: 726608901011-gl302upqs3gschaph33sqp5abuavp5v9.apps.googleusercontent.com

                //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 
//Client secret: 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

const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

passport.use(new GoogleStrategy({
    clientID:'726608901011-gl302upqs3gschaph33sqp5abuavp5v9.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8001/api/auth/google",
    scope: ['openid' , 'email' , 'profile'],
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({googleId: profile.id})
    console.log(profile)
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
      return cb(null, newUser);
  }
));

passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id).then((user , err) =>{
        done(err , user)
    })
})