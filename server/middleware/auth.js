module.exports = options => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../modules/AdminUser')
  const assert = require('http-assert')
  return async (req, res, next) => {
    // 校验用户是否登录（获取请求头中的token）
    const token = String(req.headers.authorization || '').split(' ').pop();
    if (!token) return res.status(401).send({ msg: '请先登录!' })
    // assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, req.app.get('secret')) // tokenData:{id:xxx,...} 这里的 req.app 相当于外部的 app
    if (!id) return res.status(401).send({ msg: '请先登录!' })
    // assert(id, 401, '无效token')
    req.user = await AdminUser.findById(id) // 在req或res上挂载一个user来判断用户的登录情况
    if (!req.user) return res.status(401).send({ msg: '请先登录!' })
    // npm i http-assert  用于判断条件是否正确
    // assert(req.user, 401, '请先登录')
    await next()
  }
}