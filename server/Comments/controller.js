const Comment = require('./Commnts')

const saveComment = async(req, res) => {
    console.log('api', req.body, req.body.authorId , req.body.blogId, req.body.text)
    
    if(req.body.text && req.body.authorId && req.body.blogId) {
        await new Comment({
        // rate: req.body.rate,
            text: req.body.text,
            authorId: req.body.authorId,
            blogId: req.body.blogId,
            date: Date.now()
        }).save()
        res.status(200).send(true)
    } 
    else {
        res.status(400).send('error: пустой текст')
    }
}

module.exports = { saveComment }