const Category = require('./Categories')

const getAllCategories = async(req , res) => {
    const data = await Category.find()
    console.log(data)
    res.status(200).send({data})
}

module.exports = {getAllCategories}