// 文章
const mongoose = require('mongoose')

const schems = new mongoose.Schema({
  title: { type: String },
  categories: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category' // 关联本身
  }],
  body: { type: String }
})

module.exports = mongoose.model('Article', schems)