module.exports = app => {
  const express = require('express')
  const router = express.Router({
    nergeParams: true
  })
  // 创建分类
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 编辑分类
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 分类列表
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') { // 需要关联查询
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })
  // 获取某个分类详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除指定分类
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({ success: true })
  })
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    // 中间件
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../modules/${modelName}`) // 挂载一个属性为Model
    next()
  }, router)

  // npm i multer 安装 处理二进制数据
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads' // 目标地址
  })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}