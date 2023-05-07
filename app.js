//// modules ////
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// files
const routes = require('./routes')
app.use(express.static('public'))
require('./config/mongoose')

// handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// body-parser (before setting route)
app.use(express.urlencoded({ extended: true }))


//// routes ////
// index
app.use('/', routes)

// listen port
const PORT = process.env.PORT || 3000
const HOST_URL = process.env.HOST_URL || `http://localhost:${PORT}`
app.listen(PORT, () => console.log(HOST_URL))