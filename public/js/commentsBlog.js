    // const stars = document.querySelectorAll('.comment-stars>img')
//     console.log(stars)
// function rateFilm(rate){
//     for(let i = 0; i < stars.length; i++){
//         stars[i].classList.remove('active-star')
//     }
//     for(let i = 0; i <rate; i++){
//         stars[i].classList.add('active-star')
//     }
// }


function sendComment(e){
    e.preventDefault()

    const comment_text= document.querySelector('#comment-text').value
    const author = document.querySelector('#comment_author').value
    const blog = document.querySelector('#comment_blog').value

    axios.post('/api/comment' , { text: comment_text , authorId: author, blogId: blog })
        .then(data => {
            console.log(data)
            if(data.status.statusText === 'OK'){
                console.log(data, comment_text, author, blog)
                location.reload()
            }
            
        })
}