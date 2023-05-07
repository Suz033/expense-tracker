// files
const Category = require('../category')
const db = require('../../config/mongoose')

// add data to db
db.once('open', () => {
  const category = [
    {
      name: '家居物業',
      icon: 'fa-solid fa-house fa-xl'
    },
    {
      name: '交通出行',
      icon: 'fa-solid fa-van-shuttle fa-xl'
    },
    {
      name: '休閒娛樂',
      icon: 'fa-solid fa-face-grin-beam fa-xl'
    },
    {
      name: '餐飲食品',
      icon: 'fa-solid fa-utensils fa-xl'
    },
    {
      name: '其他',
      icon: 'fa-solid fa-pen fa-xl'
    },
  ]
  Promise.all(
    category.map((ele, index) => {
      return Category.create({ id: index + 1 ,name: ele.name, icon: ele.icon })
    })
  )
  .then(() => {
    console.log('categorySeeder script added.')
    process.exit()
  })
  .catch((err) => {
    console.error(err)
    process.exit()
  })
})