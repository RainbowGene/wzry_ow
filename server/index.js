const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())

// token加密关键字,这里的gene关键字应该放到环境变量中
app.set('secret', 'gene')

// 静态托管
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./db/db')(app)
require('./route/admin')(app)
require('./route/web')(app)

app.listen(3000, () => {
  console.log('服务器启动在 3000')
})