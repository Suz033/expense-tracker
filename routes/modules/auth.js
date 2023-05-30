// modules
const express = require('express')
const router = express.Router()

// files
const passport = require('passport')

// routers
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// exports
module.exports = router