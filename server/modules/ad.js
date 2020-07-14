// 广告(幻灯片)
const mongoose = require('mongoose')

const schems = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

module.exports = mongoose.model('Ad', schems)