// 用户
const mongoose = require('mongoose')

const schems = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select:false, // 查不出密码
    set(val) { // 加密
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

module.exports = mongoose.model('AdminUser', schems)