const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/main', (req, res) => {
    res.render('main')
})

app.get('/user', (req, res) => {
    res.render('user')
})

app.get('/page', (req, res) => {
    res.render('page')
})

app.get('/blog', (req, res) => {
    res.render('newBlog')
})

app.get('/sign', (req, res) => {
    res.render('sign')
})

app.get('/link', (req, res) => {
    res.render('link')
})


const PORT = 8000
 
app.listen(PORT, () => {
    console.log(`Listening on  PORT: ${PORT}`)
})