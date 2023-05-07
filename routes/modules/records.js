//// modules ////
const express = require('express')
const router = express.Router()


//// files ////
const Record = require('../../models/record')
const Category = require('../../models/category')


//// routes ////
// new
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .sort({ id: 'asc' })
    .then(categories => res.render('new', { categories }))
    .catch(err => console.error(err))
})

router.post('/', (req, res) => {
  const records = {
    ...req.body,
    userId: req.user._id
  }
  return Record.create(records)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// edit
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId }).lean()
    const category = await Category.find().lean().sort({ id: 'asc' })

    res.render('edit', { record, category })
  } catch (err) {
    console.error(err)
  }
})

router.put('/:id', (req, res) => {
  const records = {
    ...req.body,
    userId: req.user._id
  }
  const id = req.params.id
  return Record.findByIdAndUpdate(id, records)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.deleteOne())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})


//// exports ////
module.exports = router