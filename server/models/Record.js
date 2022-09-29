const mongoose = require('mongoose')
const { Schema } = mongoose
const Record = new Schema({
  letterId: String,
  letterName: String,
  letterEmail: String,
  letterTitle: String,
  letterCategory: String,
  letterText: String,
  letterAvatar: String,
  letterDate: Date,
  letterPublic: Boolean
})

module.exports = mongoose.model('Record', Record)
