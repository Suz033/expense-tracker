// modules
const express = require('express')
const router = express.Router()

// files
const Record = require('../../models/record')
const Category = require('../../models/category')

// routes
router.get('/', async (req, res) => {
  const userId = req.user._id
  await Record.find({ userId })
    .lean()
    .sort({ date: 'desc'})
    .then(records => {
      return Promise.all(        
        records.map(async record => {
          // modify date format: yyyy/mm/dd
          record.date = record.date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })

          // return category icon
          const category = await Category.findOne({ id: record.categoryId })
          record.icon = category.icon

          return record
        })
      )
    })
    .then(records => res.render('index', { records }))
    .catch(err => console.error(err))
})

// exports
module.exports = router