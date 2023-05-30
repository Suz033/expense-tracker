// modules
const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')

// files
const Record = require('../../models/record')
const Category = require('../../models/category')

// routes
router.get('/', async (req, res) => {
  const userId = req.user._id
  try {
    const records = await Record.find({ userId }).lean().sort({ date: 'desc' })

    const totalAmount = records.reduce(function (total, record) {
      return total + record.amount
    }, 0)
    
    const categories = await Category.find().lean()
    
    const modifiedRecords = await Promise.all(records.map(async (record) => {
      record.date = dayjs(record.date).format('YYYY-MM-DD')
      
      const categoryIcon = await Category.findOne({ _id: record.categoryId }).lean()
      
      if (categoryIcon) {
        record.icon = categories.icon
      }
      
      return { record, categoryIcon }
    }))
    
    const { record, categoryIcon } = modifiedRecords
    
    res.render('index', { categories, totalAmount, records: modifiedRecords })
    // console.log(modifiedRecords)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/search', async (req, res) => {
  const userId = req.user._id
  const categoryId = req.query.categoryId

  if (!categoryId) {
    return res.redirect('/')
  }

  try {
    const categories = await Category.find().lean()

    categories.forEach(item => {
      if (String(item._id) === categoryId) {
        item.selected = true
      } else {
        item.selected = false
      }
    })

    const records = await Record.find({ userId, categoryId })
      .populate('categoryId')
      .lean()
      .sort({ date: 'desc' })

    const totalAmount = records.reduce(function (total, record) {
      return total + record.amount
    }, 0)

    const modifiedRecords = await Promise.all(records.map(async (record) => {
      record.date = dayjs(record.date).format('YYYY-MM-DD')

      const categoryIcon = await Category.findOne({ _id: record.categoryId }).lean()

      if (categoryIcon) {
        record.icon = categories.icon
      }

      return { record, categoryIcon }
    }))

    res.render('index', { records: modifiedRecords, categories, totalAmount })
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal Server Error')
  }
})

// exports
module.exports = router