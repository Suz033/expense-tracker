// files
const db = require('../../config/mongoose')
const User = require('../user')
const Category = require('../category')
const Record = require('../record')
const record = require('./record.json').result
const user = require('./user.json').result

// add to db
db.once('open', () => {
  Promise.all(
      record.map(async ele => {
      const category = await Category.findOne({ name: ele.category })
      const user = await User.findOne({ name: ele.user })
      if (!category) {
        throw new Error(`Category "${ele.category}" does not exist.`)
      }
      if (!user) {
        throw new Error(`User "${ele.user}" does not exist.`)
      }
      return Record.create({
        name: ele.name,
        date: ele.date,
        amount: ele.amount,
        userId: user.id,
        categoryId: category.id
      })
    })
  )
  .then(() => {
    console.log('recordSeeder script added.')
    process.exit()
  })
  .catch((err) => {
    console.error(err)
    process.exit()
  })
})