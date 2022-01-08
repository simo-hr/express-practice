const express = require('express')
const app = express()
const systemlogger = require('./lib/log/systemlogger')
const accesslogger = require('./lib/log/accesslogger')

app.set('view engine', 'ejs')
app.disable('x-powered-by')

app.use(
  '/public',
  express.static(__dirname + '/public/' + (process.env.NODE_ENV === 'development' ? 'development' : 'production'))
)
app.use('/posts', require('./routes/posts'))
// 静的ファイルへのアクセスログはいらないのでここに配置
app.use(accesslogger())

app.use('/', require('./routes/index.js'))
app.use(systemlogger())
app.listen(3000)
