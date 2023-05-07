// modules
const express = require('express')
const router = express.Router()

// files
const Record = require('../../models/record')
const Category = require('../../models/category')

// routes
router.post('/', (req, res) => {
  const records = req.body
  return Record.create(records)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.post('/:id', (req, res) => {
  const id = req.params.id
  const records = req.body
  return Record.findByIdAndUpdate(id, records)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.post('/:id/delete', (req, res) => {
  const _id = req.params.id
  return Record.findOne({ _id })
    .then(record => record.deleteOne())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ id: 'asc' })
    .then(categories => res.render('new', { categories }))
    .catch(err => console.error(err)) 
  })
  
router.get('/:id/edit', async (req, res) => {
  try {
    const _id = req.params.id
    const record = await Record.findOne({ _id }).lean()
    const category = await Category.find().lean().sort({ id: 'asc' })

    res.render('edit', { record, category })
  } catch (err) {
    console.error(err)
  }
})


router.get('/edit', (req, res) => {
  res.render('edit')
})

// exports
module.exports = router