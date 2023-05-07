// files
const Record = require('../record')
const db = require('../../config/mongoose')
const record = require('../seeds/record.json').result
const Category = require('../category')

// add to db
db.once('open', () => {
  Promise.all(
    record.map(async ele => {
      const category = await Category.findOne({ name: ele.category })
      if (!category) {
        throw new Error(`Category "${ele.category}" does not exist.`)
      }
      return Record.create({
        name: ele.name,
        date: ele.date,
        amount: ele.amount,
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