// modules
const express = require('express')
const router = express.Router()

// files
const Record = require('../../models/record')
const Category = require('../../models/category')

// routes
router.get('/', async (req, res) => {
  const userId = req.user._id
  try {
    const records = await Record.find({ userId }).lean().sort({ date: 'desc' })

    const modifiedRecords = await Promise.all(records.map(async (record) => {
      // modify date format: yyyy/mm/dd
      record.date = record.date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })

      const category = await Category.findOne({ _id: record.categoryId }).lean()
      
      if (category) {
        record.icon = category.icon
      }
      
      return { record, category }
    }))
    
    const { record, category } = modifiedRecords
    
    res.render('index', { modifiedRecords })
    // console.log(modifiedRecords)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

// exports
module.exports = router