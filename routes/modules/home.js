// modules
const express = require('express')
const router = express.Router()

// files
const CATEGORY = require('../../models/image')

// routes
router.get('/', (req, res) => {
  res.render('index', { CATEGORY })
})

// exports
module.exports = router