// 物品模型
const mongoose = require('mongoose')

const schems = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
  // parent: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'Item' // 关联本身
  // }
})

module.exports = mongoose.model('Item', schems)