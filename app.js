//// modules ////
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

// files
const usePassport = require('./config/passport')
const routes = require('./routes')
app.use(express.static('public'))
require('./config/mongoose')

// handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// body-parser (before setting route)
app.use(express.urlencoded({ extended: true }))

// method-override
app.use(methodOverride('_method'))

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// passport
usePassport(app)  // before routes

// flash message
app.use(flash())


//// auth state ////
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


//// routes ////
// index
app.use(routes)

// listen port
const PORT = process.env.PORT || 3000
const HOST_URL = process.env.HOST_URL || `http://localhost:${PORT}`
app.listen(PORT, () => console.log(HOST_URL))