const filterByCategory = async (req, res) => {
    const options= {}
    const category = await Category.findOne({key: req.query.categ})

    if(category){
        options.category = category._id
        res.locals.category = req.query.categ
    }

    return options   
}

const search = (req, res, options) => {
    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                title: new RegExp(req.query.search , 'i')
            },
            {
                text: new RegExp(req.query.search , 'i')
            }
        ]
        res.locals.search = req.query.search
    }
}

const pagination = (req) => {
    let page = 0
    const limit = 2 
    if(req.query.page && req.query.page > 0){
        page = req.query.page
    }

    return {page, limit}
}

module.exports = {
    filterByCategory, 
    search,
    pagination
}