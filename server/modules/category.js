const mongoose = require('mongoose')

const schems = new mongoose.Schema({
  name: { type: String },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category' // 关联本身
  }
})

module.exports = mongoose.model('Category', schems)