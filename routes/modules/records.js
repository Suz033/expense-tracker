// modules
const express = require('express')
const router = express.Router()

// files
const Record = require('../../models/record')
const Category = require('../../models/category')

// routes
router.post('/', (req, res) => {
  const records = req.body
  console.log(records)
  return Record.create(records)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ id: 'asc' })
    .then(categories => res.render('new', { categories }))  
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

// exports
module.exports = router