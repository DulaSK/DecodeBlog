const Category = require('./Categories')
const data = [
    'Прогнозы в IT',
    'Веб-разработка',
    'Мобильная разработка',
    'Фриланс',
    'Алгоритмы',
    'Тестирование IT систем',
    'Разработка игр',
    'Дизайн и юзабилити',
    'Искуственный интелект',
    'Машинное обучение'
]

async function writeDataCategory(){
    const length = await Category.count()
    if(length === 0){
        data.map((item , index) => {
            new Category ({
                name: item,
                key: index
            }).save()
        })
    }
}

module.exports = writeDataCategory