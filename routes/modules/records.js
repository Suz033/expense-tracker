// modules
const express = require('express')
const router = express.Router()

// files

// routes
router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

// exports
module.exports = router