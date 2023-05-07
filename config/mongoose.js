// modules
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// db
const db = mongoose.connection

db.on('error',() => {
  console.error('=== mongodb error ===')
})
db.once('open',() => {
  console.log('=== mongodb connected ===')
})

// exports
module.exports = db