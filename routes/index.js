// modules
const express = require('express')
const router = express.Router()

// files
const home = require('./modules/home')
const records = require('./modules/records')

// routes
router.use('/', home)
router.use('/records', records)

// exports
module.exports = router