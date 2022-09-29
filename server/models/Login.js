const mongoose = require('mongoose')
const { Schema } = mongoose
const Login = new Schema({
  login: String,
  password: String,
  role: String
})

module.exports = mongoose.model('Login', Login)
