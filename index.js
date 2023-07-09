const express = require('express');
const session = require('express-session');
const mongooseStore = require('connect-mongo')
const passport = require('passport')

const app = express();

require('./server/config/db')
require('./server/config/passport')

app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())
app.use(session({
    name:'decodeBlog.session',
    secret: 'keybord cat',
    maxAge: 1000*60*60*7,
    store: mongooseStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017'
    })
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs');

app.use(require('./server/pages/router'))
app.use(require('./server/auth/router'))
app.use(require('./server/Categories/router'))
app.use(require('./server/Blog/router'))
app.use(require('./server/Comments/router'))

// app.use(require('./server/SetUp/router'))


const PORT = 8001
 
app.listen(PORT, () => {
    console.log(`Listening on  PORT: ${PORT}`)
})