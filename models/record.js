// modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema
const recordSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId:  {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    // required: true
  },
  categoryId: {
    type: Schema.Types.Number,
    ref:'Category',
    index: true,
    required: true
  }
})

// exports
module.exports = mongoose.model('Record', recordSchema)