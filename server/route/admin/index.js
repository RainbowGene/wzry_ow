module.exports = app => {
  const express = require('express')
  // 生成token   npm i jsonwebtoken
  const jwt = require('jsonwebtoken')
  // const AdminUser = require('../../models/AdminUser')
  const mongoose = require('mongoose')
  const AdminUser = mongoose.model('AdminUser')
  const assert = require('http-assert')
  const router = express.Router({
    nergeParams: true
  })
  // 登录校验的中间件函数
  const auth = require('../../middleware/auth')
  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 编辑资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 查询资源
  router.get('/', async (req, res) => {
    let queryOptions = {}
    if (req.Model.modelName === 'Category') { // 需要关联查询
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  // 单个资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({ success: true })
  })
  app.use('/admin/api/rest/:resource', auth(), async (req, res, next) => {
    // 中间件
    const modelName = require('inflection').classify(req.params.resource)
    // req.Model = require(`../../models/${modelName}`) // 挂载一个属性为Model
    req.Model = mongoose.model(`${modelName}`)
    next()
  }, router)

  // npm i multer 安装 处理二进制数据
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads' // 目标地址
  })
  // 在这里使用请求效验auth()时，由于我们前端使用的el-upload传图片使用的是el底层的ajax传输，
  // 没有经过我们自定的请求拦截，header中没有携带 authorizetion,需要在全局中为el-upload加入该属性
  app.post('/admin/api/upload', auth(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.验证用户  2.效验密码   3.返回token
    const user = await AdminUser.findOne({ username }).select('+password')  // 模型中我们设置了 select:false
    if (!user) return res.status(422).send({ msg: '用户不存在!' }) // 使用 assert
    // assert(user, 422, '用户不存在!')
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) return res.status(422).send({ msg: '密码错误!' })
    // assert(isValid, 422, '密码错误!')
    const token = jwt.sign({ id: user._id }, app.get('secret')) // 可以放多个键值对
    res.send({ token, username: user.username })
  })

  // 错误处理（中间件）
  // app.use(async (err, req, res, next) => {
  //   res.status(err.statusCode || 500).send({
  //     msg: err.message
  //   })
  // })
}