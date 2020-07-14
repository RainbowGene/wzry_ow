// 用户
const mongoose = require('mongoose')

const schems = new mongoose.Schema({
  username: { type: String },
  password: { type: String }
})

module.exports = mongoose.model('AdminUser', schems)