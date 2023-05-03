// modules
const express = require('express')
const router = express.Router()

// files
const home = require('./modules/home')

// routes
router.use('/', home)

// exports
module.exports = router