module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/wzry-moba', {
    useNewUrlParser: true
  })

  // npm i require-all 可以引用某文件夹下所有js
  require('require-all')(__dirname + '/../models')
}