// modules
const express = require('express')
const router = express.Router()

// files
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

// routes
router.use('/records', authenticator, records)
router.use('/users', users)
router.use('/', authenticator, home)

// exports
module.exports = router