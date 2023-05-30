// modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema
const categorySchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

// exports
module.exports = mongoose.model('Category', categorySchema)