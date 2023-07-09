function deleteBlogs(id, authorID){
    axios.delete(`/api/blog/${id}`).then(data => {
      if(data.status === 200){
          location.replace(`/main/${authorID}`)
      }else if (data.status === 404){
          location.replace(`/not-found`)
      }
    })   
  }