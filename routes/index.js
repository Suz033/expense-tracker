// modules
const express = require('express')
const router = express.Router()

// files
const home = require('./modules/home')
const expenses = require('./modules/records')

// routes
router.use('/', home)
router.use('/expenses', expenses)

// exports
module.exports = router