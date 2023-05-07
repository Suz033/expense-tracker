// modules
const express = require('express')
const router = express.Router()

// files
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')

// routes
router.use('/', home)
router.use('/records', records)
router.use('/users', users)

// exports
module.exports = router