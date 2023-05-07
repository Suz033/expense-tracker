// modules
const express = require('express')
const router = express.Router()

// files
const CATEGORY = require('../../models/image')

// routes
router.get('/new', (req, res) => {
  res.render('new', { CATEGORY })
})

router.get('/edit', (req, res) => {
  res.render('edit', { CATEGORY })
})

// exports
module.exports = router