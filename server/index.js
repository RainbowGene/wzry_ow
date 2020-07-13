const express = require('express')

const app = express()

app.use(require('cors')())
app.use(express.json())

// 静态托管
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./db/db')(app)
require('./route/admin')(app)

app.listen(3000, () => {
  console.log('服务器启动在 3000')
})